import { Request, Response } from "express";
import { createElement } from "react";
import { config } from "../../config.js";
import { VerifyEmail } from "../../emails/templates/VerifyEmail.js";
import { sendEmail } from "../../emails/sendEmail.js";
import {
  findEmailTokenService,
  generateNewEmailToken,
} from "../../services/auth.js";

export const verifyResendController = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const user = await findEmailTokenService(token);

    if (!user)
      return res.status(404).json({
        message: "Link non valido.",
      });

    if (user.emailVerified)
      return res.status(409).json({ message: "Account gia attivato." });

    const { emailVerificationToken } = await generateNewEmailToken(token);

    await sendEmail(
      "Verifica il tuo indirizzo email",
      createElement(VerifyEmail, {
        firstName: user.firstName,
        lastName: user.lastName,
        createdByName: user.createdBy,
        verificationUrl:
          config.NODE_ENV === "development"
            ? `http://localhost:5173/admin/verifica?token=${emailVerificationToken}`
            : `${config.ORIGIN}/admin/verifica?token=${emailVerificationToken}`,
        expiresInHours: 24,
        email: user.email,
      }),
      user.email,
    );

    return res.status(200).json({ message: "Nuovo link inviato." });
  } catch {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
