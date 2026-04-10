import { Request, Response } from "express";
import User from "../../db/models/User";
import bcrypt from "bcrypt";
import { logger } from "../../logger";
import {
  changePasswordService,
  comparePasswordService,
  findUserByIDService,
} from "../../services/auth";

export const changePasswordController = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { password, oldPassword } = req.body;

  try {
    logger.info(`[PASSWORD] Change attempt for user: ${_id}`);

    // Validazione input
    if (!password || !oldPassword) {
      logger.warn(`[PASSWORD] Failed: missing fields - user: ${_id}`);
      return res
        .status(400)
        .json({ message: "Tutti i campi sono obbligatori" });
    }

    const user = await findUserByIDService(_id);

    if (!user) {
      logger.warn(`[PASSWORD] Failed: user not found - ${_id}`);
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Verifica password attuale
    const isOldPasswordValid = await comparePasswordService(
      oldPassword,
      user.password,
    );
    if (!isOldPasswordValid) {
      logger.warn(`[PASSWORD] Failed: wrong old password - user: ${_id}`);
      return res.status(400).json({ message: "Password attuale errata" });
    }

    // Hash nuova password
    await changePasswordService(_id, password);

    logger.info(`[PASSWORD] Changed successfully for user: ${_id}`);

    return res.status(200).json({
      message: "Password modificata con successo!",
    });
  } catch (error) {
    logger.error(`[PASSWORD] Error for user ${_id}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
