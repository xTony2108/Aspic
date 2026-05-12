import { Request, Response } from "express";
import {
  activateAccountService,
  findEmailTokenService,
} from "../../services/auth.js";

export const verifyEmailController = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  try {
    const user = await findEmailTokenService(token);

    if (!user) return res.status(404).json({ message: "Link non valido." });

    const tokenExpired =
      user.emailVerificationExpires &&
      new Date(user.emailVerificationExpires).getTime() < Date.now();

    if (tokenExpired)
      return res.status(410).json({ message: "Il link è scaduto." });

    if (user.emailVerified)
      return res.status(409).json({ message: "Account gia attivato." });

    await activateAccountService(token, password);

    return res.status(200).json({ message: "Account attivato con successo!" });
  } catch {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
