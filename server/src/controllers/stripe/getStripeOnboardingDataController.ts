import { Request, Response } from "express";
import { logger } from "../../logger.js";
import { findUserByIDService } from "../../services/admin.js";
import { getStripeOnboardingLinkService } from "../../services/auth.js";

export const getStripeOnboardingDataController = async (
  req: Request,
  res: Response,
) => {
  const userID = req.user._id;

  try {
    logger.info(`[PROFILE] Request for user: ${userID}`);

    const userData = await findUserByIDService(userID);

    if (!userData) {
      logger.warn(`[PROFILE] Not found for user: ${userID}`);
      return res.status(404).json({ message: "Utente non trovato" });
    }

    logger.info(`[PROFILE] Retrieved for user: ${userID}`);

    const stripeData = await getStripeOnboardingLinkService(userID);

    return res.status(200).json({
      message: "Dati recuperati con successo",
      stripeData,
    });
  } catch (error) {
    logger.error(`[PROFILE] Error for user ${userID}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
