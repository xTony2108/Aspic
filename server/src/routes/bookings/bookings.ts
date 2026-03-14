import express from "express";
import { bookingController } from "../../controllers/bookingController";
const router = express.Router();

/**
 * @path /api/bookings
 * @method POST
 */

router.post("/", bookingController);

export default router;
