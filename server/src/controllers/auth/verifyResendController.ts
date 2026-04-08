import { Request, Response } from "express";
import { createElement } from "react";
import { VerifyEmail } from "../../emails/templates/VerifyEmail";
import { sendEmail } from "../../emails/sendEmail";
import {
  findEmailTokenService,
  generateNewEmailToken,
} from "../../services/auth";

export const verifyResendController = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const user = await findEmailTokenService(token);

    if (!user)
      return res.status(404).json({
        message: "Utente non trovato. Si prega di contattare l'amministrazione",
      });

    const { generatedPw, emailVerificationToken } =
      await generateNewEmailToken(token);

    //Invio mail di verifica

    await sendEmail(
      "Verifica il tuo indirizzo email",
      createElement(VerifyEmail, {
        firstName: user.firstName,
        lastName: user.lastName,
        createdByName: user.createdBy,
        verificationUrl: `http://localhost:5173/admin/verifica?token=${emailVerificationToken}`,
        expiresInHours: 24,
        email: user.email,
        temporaryPassword: generatedPw,
      }),
      user.email,
    );

    return res.status(200).json({ message: "Nuovo link inviato." });
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
