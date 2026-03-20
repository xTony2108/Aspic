import { Request, Response } from "express";
import { generateTempPassword } from "../../helpers/generateRandomPassword";
import User from "../../db/models/User";
import crypto from "crypto";
import { sendEmail } from "../../emails/sendEmail";
import { createElement } from "react";
import VerificaEmail from "../../emails/templates/VerificaEmail";

export const registerController = async (req: Request, res: Response) => {
  const { email, createdBy, firstName, lastName } = req.body;
  try {
    // Controllo se la mail è già presente
    const user = await User.findOne({ email }, "email", {
      lean: true,
    });

    if (user) return res.status(400).json({ message: "Email già registrata!" });

    // Creo utente con password temporanea e dati di veriifca email

    const generatedPw = generateTempPassword();

    const emailVerificationExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    await User.create({
      ...req.body,
      password: null,
      passwordChanged: false,
      temporaryPassword: generatedPw,
      emailVerified: false,
      emailVerificationToken,
      emailVerificationExpires,
    });

    //Invio mail di verifica

    await sendEmail(
      "Verifica il tuo indirizzo email",
      createElement(VerificaEmail, {
        firstName,
        lastName,
        createdByName: createdBy,
        verificationUrl: `http://localhost:5173/admin/verifica?token=${emailVerificationToken}`,
        expiresInHours: 24,
        email,
        temporaryPassword: generatedPw,
      }),
    );

    return res
      .status(200)
      .json({ message: "Registrazione effettuata con successo!" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Errore generico" });
  }
};
