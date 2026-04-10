import { Request, Response } from "express";
import User from "../../db/models/User";
import {
  confirmEmailService,
  findEmailTokenService,
} from "../../services/auth";

export const verifyEmailController = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const user = await findEmailTokenService(token);

    if (!user) return res.status(404).json({ message: "Link non valido." });

    const tokenScaduto =
      user?.emailVerificationExpires &&
      new Date(user?.emailVerificationExpires).getTime() < Date.now();

    if (tokenScaduto)
      return res.status(410).json({ message: "Il link è scaduto." });

    await confirmEmailService(token);

    return res
      .status(200)
      .json({ message: "Verifica effettuata con successo!" });
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
