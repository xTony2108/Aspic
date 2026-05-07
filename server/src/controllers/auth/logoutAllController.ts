import { Request, Response } from "express";
import { logger } from "../../logger.js";
import { logoutAllService } from "../../services/auth.js";

export const logoutAllController = async (req: Request, res: Response) => {
  const { jti, _id } = req.user;

  try {
    logger.info(`[LOGOUT ALL] Attempt for user: ${_id} (JTI: ${jti})`);
    const deletedToken = await logoutAllService(_id, jti);

    if (!deletedToken) {
      logger.warn(`[LOGOUT ALL] Token not found - JTI: ${jti}`);
    } else {
      logger.info(`[LOGOUT ALL] Successful for user: ${_id}`);
    }

    return res.status(200).json({
      message: "Logout di tutti i dispositivi effettuato con successo!",
    });
  } catch (error) {
    logger.error(`[LOGOUT ALL] Error for user ${_id}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
