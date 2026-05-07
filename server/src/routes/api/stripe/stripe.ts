import express, { Request, Response } from "express";
import { handleStripeRefreshService } from "../../../services/stripe.js";
import User from "../../../db/models/User.js";
import { stripe } from "../../../lib/stripe/stripe.js";
import { verifyAccessToken } from "../../../middleware/verifyAccessToken.js";
import { getStripeOnboardingDataController } from "../../../controllers/stripe/getStripeOnboardingDataController.js";

const router = express.Router();

router.use(verifyAccessToken);

/**
 * @path /api/stripe/onboarding
 * GET
 */

router.get("/onboarding", getStripeOnboardingDataController);

router.get("/refresh", handleStripeRefreshService);

export const finalizeOnboarding = async (req: Request, res: Response) => {
  const userId = req.user._id;

  if (!userId) return res.status(401).json({ message: "Non autorizzato" });

  const user = await User.findById(userId);
  if (!user || !user.stripeAccountId)
    return res.status(404).json({ message: "Utente non trovato" });

  const stripeAccount = await stripe.accounts.retrieve(user.stripeAccountId);

  user.onboardingCompleted = stripeAccount.details_submitted;
  user.chargesEnabled = stripeAccount.charges_enabled;
  user.payoutsEnabled = stripeAccount.payouts_enabled;

  await user.save();

  return res.status(200).json({
    message: "Onboarding finalizzato",
    onboardingCompleted: user.onboardingCompleted,
  });
};

router.post("/finalize-onboarding", finalizeOnboarding);

export default router;
