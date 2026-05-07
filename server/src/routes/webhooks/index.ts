import express from "express";
import stripeRoute from "./stripe/stripe.js";

const router = express.Router();

/**
 * @path /webhooks/stripe
 */

router.use("/stripe", express.raw({ type: "application/json" }), stripeRoute);

export default router;
