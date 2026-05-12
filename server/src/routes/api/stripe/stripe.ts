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

export default router;
