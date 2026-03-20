import { Request, Response } from "express";
import User from "../../db/models/User";
import crypto from "crypto";
import { createElement } from "react";
import VerificaEmail from "../../emails/templates/VerificaEmail";
import { sendEmail } from "../../emails/sendEmail";

export const verifyResendController = async (req: Request, res: Response) => {
  const { token } = req.body;

  const user = await User.findOne(
    { emailVerificationToken: token },
    "firstName lastName createdBy email temporaryPassword",
  );

  if (!user)
    return res.status(404).json({
      message: "Utente non trovato. Si prega di contattare l'amministrazione",
    });

  const emailVerificationToken = crypto.randomBytes(32).toString("hex");
  const emailVerificationExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);

  await User.updateOne(
    { emailVerificationToken: token },
    {
      emailVerificationToken,
      emailVerificationExpires,
    },
  );

  //Invio mail di verifica

  await sendEmail(
    "Verifica il tuo indirizzo email",
    createElement(VerificaEmail, {
      firstName: user.firstName,
      lastName: user.lastName,
      createdByName: user.createdBy,
      verificationUrl: `http://localhost:5173/admin/verifica?token=${emailVerificationToken}`,
      expiresInHours: 24,
      email: user.email,
      temporaryPassword: user.temporaryPassword,
    }),
  );

  return res.status(200).json({ message: "Nuovo link inviato." });
};
