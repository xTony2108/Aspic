import { Request, Response } from "express";
import { logger } from "../../logger";
import { findUserByIDService } from "../../services/auth";

export const meController = async (req: Request, res: Response) => {
  const userID = req.user._id;

  try {
    logger.info(`[PROFILE] Request for user: ${userID}`);

    const userData = await findUserByIDService(userID);

    if (!userData) {
      logger.warn(`[PROFILE] Not found for user: ${userID}`);
      return res.status(404).json({ message: "Utente non trovato" });
    }

    logger.info(`[PROFILE] Retrieved for user: ${userID}`);

    return res.status(200).json({
      message: "Dati recuperati con successo",
      userData,
    });
  } catch (error) {
    logger.error(`[PROFILE] Error for user ${userID}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
