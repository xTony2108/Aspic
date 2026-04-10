import { Request, Response } from "express";
import { sendEmail } from "../../emails/sendEmail";
import { createElement } from "react";
import VerificaEmail from "../../emails/templates/VerifyEmail";
import { logger } from "../../logger";
import { config } from "../../config";
import { createUserService, findUserByEmailService } from "../../services/auth";

export const registerController = async (req: Request, res: Response) => {
  const { email, createdBy, firstName, lastName } = req.body;

  try {
    logger.info(
      `[REGISTER] Registration attempt for: ${email} by ${createdBy}`,
    );

    // Controllo se la mail è già presente
    const existingUser = await findUserByEmailService(email);

    if (existingUser) {
      logger.warn(
        `[REGISTER] Registration failed: email already exists - ${email}`,
      );
      return res.status(400).json({ message: "Email già registrata!" });
    }

    // Creo utente con password temporanea e dati di verifica email

    const { id, emailVerificationToken, generatedPw } = await createUserService(
      req.body,
    );

    logger.info(`[REGISTER] User created: ${id} - ${email}`);

    // Invio mail di verifica
    const verificationUrl =
      config.NODE_ENV === "development"
        ? `http://localhost:5173/admin/verifica?token=${emailVerificationToken}`
        : `${config.ORIGIN}/admin/verifica?token=${emailVerificationToken}`;

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
      email,
    );

    logger.info(`[REGISTER] Verification email sent to: ${email}`);

    return res.status(200).json({
      message: "Registrazione effettuata con successo!",
      userId: id,
    });
  } catch (error) {
    logger.error(`[REGISTER] Error for ${email}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
