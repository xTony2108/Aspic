import express from "express";
import { appointmentsController } from "../../../controllers/appointments/appointmentsController.js";
import { validateBody } from "../../../middleware/validateBody.js";
import { baseSchema } from "../../../schema/schemas.js";
const router = express.Router();

/**
 * @path /api/appointments
 * @method POST
 */

router.post("/", validateBody(baseSchema), appointmentsController);

export default router;
