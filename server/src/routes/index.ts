import express from "express";
import bookingsRoute from "./bookings/bookings";
import authRoute from "./auth/auth";
import adminRoute from "./admin/admin";

const router = express.Router();

/**
 * @path /api/bookings
 */

router.use("/bookings", bookingsRoute);

/**
 * @path /api/auth
 */

router.use("/auth", authRoute);

/**
 * @path /api/admin
 */

router.use("/admin", adminRoute);

export default router;
