import express from "express";
import { bookingController } from "../../controllers/booking/bookingController";
import { validateBody } from "../../middleware/validateBody";
import { baseSchema } from "../../schema/schemas";
const router = express.Router();

/**
 * @path /api/bookings
 * @method POST
 */

router.post("/", validateBody(baseSchema), bookingController);

export default router;
