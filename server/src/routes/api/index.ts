import express from "express";
import appointmentsRoute from "./appointments/appointments.js";
import authRoute from "./auth/auth.js";
import adminRoute from "./admin/admin.js";
import stripeRoute from "./stripe/stripe.js";

const router = express.Router();
router.use(express.json());

/**
 * @path /api/appointments
 */

router.use("/appointments", appointmentsRoute);

/**
 * @path /api/auth
 */

router.use("/auth", authRoute);

/**
 * @path /api/admin
 */

router.use("/admin", adminRoute);

/**
 * @path /api/stripe
 */

router.use("/stripe", stripeRoute);

export default router;
