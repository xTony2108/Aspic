import express from "express";
import { appointmentsController } from "../../../controllers/appointments/appointmentsController";
import { validateBody } from "../../../middleware/validateBody";
import { baseSchema } from "../../../schema/schemas";
const router = express.Router();

/**
 * @path /api/appointments
 * @method POST
 */

router.post("/", validateBody(baseSchema), appointmentsController);

export default router;
