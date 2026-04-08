import express from "express";
import appointmentsRoute from "./appointments/appointments";
import authRoute from "./auth/auth";
import adminRoute from "./admin/admin";

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

export default router;
