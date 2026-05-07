import { Request, Response } from "express";
import { logger } from "../../logger.js";
import {
  createUserService,
  findUserByEmailService,
} from "../../services/auth.js";

export const registerController = async (req: Request, res: Response) => {
  const { email, createdBy } = req.body;

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

    const { id } = await createUserService(req.body);

    return res.status(200).json({
      message: "Registrazione effettuata con successo!",
      userId: id,
    });
  } catch (error) {
    logger.error(`[REGISTER] Error for ${email}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
