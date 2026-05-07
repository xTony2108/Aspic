import { Request, Response } from "express";
import { logger } from "../../logger.js";
import { findUsers } from "../../services/auth.js";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const userID = req?.user?._id;

    const users = await findUsers(userID);

    if (!users || users.length <= 0) {
      logger.warn(`[PROFESSIONAL] USERS NOT FOUND`);
      return res.status(404).json({ message: "Nessun utente trovato" });
    }

    logger.info(`[PROFESSIONAL] Retrieved USERS`);

    return res.status(200).json({
      message: "Dati recuperati con successo",
      users,
    });
  } catch (error) {
    logger.error(`[PROFESSIONAL] Error: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
