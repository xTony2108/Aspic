import express from "express";
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
