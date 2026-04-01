import { Request, Response } from "express";
import { generateTempPassword } from "../../helpers/generateRandomPassword";
import User from "../../db/models/User";
import crypto from "crypto";
import { sendEmail } from "../../emails/sendEmail";
import { createElement } from "react";
import VerificaEmail from "../../emails/templates/VerificaEmail";
import bcrypt from "bcrypt";
import { logger } from "../../logger";
import { config } from "../../config";

export const registerController = async (req: Request, res: Response) => {
  const { email, createdBy, firstName, lastName } = req.body;

  try {
    logger.info(`[REGISTER] Registration attempt for: ${email} by ${createdBy}`);

    // Controllo se la mail è già presente
    const existingUser = await User.findOne({ email }, "email", { lean: true });

    if (existingUser) {
      logger.warn(`[REGISTER] Registration failed: email already exists - ${email}`);
      return res.status(400).json({ message: "Email già registrata!" });
    }

    // Creo utente con password temporanea e dati di verifica email
    const generatedPw = generateTempPassword();
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 ore
    const hashedPw = await bcrypt.hash(generatedPw, 12);
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = await User.create({
      ...req.body,
      password: hashedPw,
      passwordChanged: false,
      emailVerified: false,
      emailVerificationToken,
      emailVerificationExpires,
    });

    logger.info(`[REGISTER] User created: ${newUser._id} - ${email}`);

    // Invio mail di verifica
    const verificationUrl =
      config.NODE_ENV === "development"
        ? `http://localhost:5173/admin/verifica?token=${emailVerificationToken}`
        : `${process.env.FRONTEND_URL}/admin/verifica?token=${emailVerificationToken}`;

    await sendEmail(
      "Verifica il tuo indirizzo email",
      createElement(VerificaEmail, {
        firstName,
        lastName,
        createdByName: createdBy,
        verificationUrl,
        expiresInHours: 24,
        email,
        temporaryPassword: generatedPw,
      }),
    );

    logger.info(`[REGISTER] Verification email sent to: ${email}`);

    return res.status(200).json({
      message: "Registrazione effettuata con successo!",
      userId: newUser._id,
    });
  } catch (error) {
    logger.error(`[REGISTER] Error for ${email}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
