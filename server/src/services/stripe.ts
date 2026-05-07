import { Request, Response } from "express";
import { getStripeOnboardingLinkService } from "./auth.js";
import { config } from "../config.js";
import mongoose from "mongoose";
import { logger } from "../logger.js";

export const handleStripeRefreshService = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user?._id;
  if (!userId) return res.redirect(`${config.ORIGIN}/login`);

  try {
    const objectID = new mongoose.Types.ObjectId(userId.toString());
    const { url } = await getStripeOnboardingLinkService(objectID);

    if (!url) {
      return res.redirect(`${config.ORIGIN}/dashboard`);
    }

    return res.redirect(url);
  } catch (error: any) {
    logger.error("Errore refresh Stripe:", error);
    return res.redirect(`${config.ORIGIN}/loginr`);
  }
};
