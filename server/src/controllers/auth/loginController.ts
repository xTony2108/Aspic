import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../db/models/User";
import { createHash } from "crypto";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/generateJWTTokens";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne(
      { email },
      "_id firstName lastName email password temporaryPassword emailVerified emailVerificationToken emailVerificationExpires passwordChanged",
      {
        lean: true,
      },
    );

    if (!user) return res.status(400).json({ message: "Credenziali errate" });

    if (!user.emailVerified) {
      const tokenScaduto =
        user.emailVerificationExpires &&
        new Date(user.emailVerificationExpires).getTime() < Date.now();

      if (tokenScaduto) {
        return res.status(403).json({
          message: "ACCOUNT_NOT_COMPLETED",
          emailVerificationToken: user.emailVerificationToken,
        });
      }

      return res.status(403).json({
        message: "ACCOUNT_NOT_COMPLETED",
        emailVerificationToken: user.emailVerificationToken,
      });
    }

    if (!user.passwordChanged) {
      const compare = password === user.temporaryPassword;

      if (!compare)
        return res.status(400).json({ message: "Credenziali errate" });
    } else {
      if (!user.password) throw new Error("Errore configurazione utente");

      const compare = await bcrypt.compare(password, user.password);

      if (!compare)
        return res.status(400).json({ message: "Credenziali errate" });
    }

    const accessToken = generateAccessToken({ _id: user._id.toString() });

    const refreshToken = generateRefreshToken({ _id: user._id.toString() });

    const isDev = process.env.NODE_ENV === "development";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isDev ? false : true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const hashedRefresh = createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await User.updateOne({ email }, { refreshToken: hashedRefresh });

    return res.status(200).json({
      message: "Login effettuato con successo!",
      accessToken,
      passwordChanged: user.passwordChanged,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Errore generico" });
  }
};
