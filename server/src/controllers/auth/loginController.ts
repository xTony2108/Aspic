import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../db/models/User";
import { createHash } from "crypto";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utility/generateJWTTokens";
import RefreshToken from "../../db/models/RefreshToken";
import { UAParser } from "ua-parser-js";
import { logger } from "../../logger";
import {
  comparePasswordService,
  createRefreshTokenService,
  findUserByEmailService,
} from "../../services/auth";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    logger.info(`[LOGIN] Attempt for email: ${email}`);

    const user = await findUserByEmailService(email);

    if (!user) {
      logger.warn(`[LOGIN] Failed: user not found - ${email}`);
      return res.status(400).json({ message: "Credenziali errate" });
    }

    const compare = await comparePasswordService(password, user.password);

    if (!compare)
      return res.status(400).json({ message: "Credenziali errate" });

    if (!user.emailVerified)
      return res.status(403).json({
        message: "ACCOUNT_NOT_COMPLETED",
        emailVerificationToken: user.emailVerificationToken,
      });

    const jti = crypto.randomUUID();

    const accessToken = generateAccessToken({ _id: user._id.toString(), jti });

    const refreshToken = await createRefreshTokenService(
      jti,
      user._id.toString(),
      req.headers["user-agent"] || "",
      req.ip || "",
    );

    const isDev = process.env.NODE_ENV === "development";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isDev ? false : true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
