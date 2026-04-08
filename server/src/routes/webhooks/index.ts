import express from "express";
import stripeRoute from "./stripe/stripe";

const router = express.Router();

/**
 * @path /webhooks/stripe
 */

router.use("/stripe", stripeRoute);

export default router;
