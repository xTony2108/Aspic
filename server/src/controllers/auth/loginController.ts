import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../db/models/User";
import { createHash } from "crypto";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/generateJWTTokens";
import RefreshToken from "../../db/models/RefreshToken";
import { UAParser } from "ua-parser-js";
import { logger } from "../../logger";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    logger.info(`[LOGIN] Attempt for email: ${email}`);

    const user = await User.findOne(
      { email },
      "_id firstName lastName email password emailVerified emailVerificationToken emailVerificationExpires passwordChanged",
      {
        lean: true,
      },
    );

    if (!user) {
      logger.warn(`[LOGIN] Failed: user not found - ${email}`);
      return res.status(400).json({ message: "Credenziali errate" });
    }

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

    const compare = await bcrypt.compare(password, user.password);

    if (!compare)
      return res.status(400).json({ message: "Credenziali errate" });

    const jti = crypto.randomUUID();

    const accessToken = generateAccessToken({ _id: user._id.toString(), jti });

    const refreshToken = generateRefreshToken({
      _id: user._id.toString(),
      jti,
    });

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

    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();

    const deviceName = `${result.browser.name || "Unknown"} on ${
      result.os.name || "Unknown"
    }`;

    await RefreshToken.create({
      jti,
      refresh_token_hash: hashedRefresh,
      device_info: {
        device_name: deviceName,
        ip: req.ip,
        user_agent: req.headers["user-agent"],
      },
      user_id: user._id,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      message: "Login effettuato con successo!",
      accessToken,
      passwordChanged: user.passwordChanged,
    });
  } catch (error) {
    logger.error(`[LOGIN] Error for ${email}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
