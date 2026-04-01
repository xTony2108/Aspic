import { Request, Response } from "express";
import User from "../../db/models/User";
import { logger } from "../../logger";

export const meController = async (req: Request, res: Response) => {
  const userId = req.user._id;

  try {
    logger.info(`[PROFILE] Request for user: ${userId}`);

    const userData = await User.findById(
      userId,
      "-_id email firstName lastName phoneNumber passwordChanged",
      { lean: true },
    );

    if (!userData) {
      logger.warn(`[PROFILE] Not found for user: ${userId}`);
      return res.status(404).json({ message: "Utente non trovato" });
    }

    logger.info(`[PROFILE] Retrieved for user: ${userId}`);

    return res.status(200).json({
      message: "Dati recuperati con successo",
      userData,
    });
  } catch (error) {
    logger.error(`[PROFILE] Error for user ${userId}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
