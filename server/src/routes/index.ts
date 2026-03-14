import express from "express";
import bookingsRoute from "./bookings/bookings";

const router = express.Router();

/**
 * @path /api/bookings
 */

router.use("/bookings", bookingsRoute);

export default router;
