import express from "express";
import { appointmentsController } from "../../../controllers/appointments/appointmentsController.js";
import { confirmDateChangeController } from "../../../controllers/appointments/confirmDateChangeController.js";
import { rejectDateChangeController } from "../../../controllers/appointments/rejectDateChangeController.js";
import { validateBody } from "../../../middleware/validateBody.js";
import { baseSchema, verificationTokenSchema } from "../../../schema/schemas.js";
const router = express.Router();

/**
 * @path /api/appointments
 * @method POST
 */

router.post("/", validateBody(baseSchema), appointmentsController);

/**
 * @path /api/appointments/change-date/confirm
 * @method POST
 */

router.post(
  "/change-date/confirm",
  validateBody(verificationTokenSchema),
  confirmDateChangeController,
);

/**
 * @path /api/appointments/change-date/reject
 * @method POST
 */

router.post(
  "/change-date/reject",
  validateBody(verificationTokenSchema),
  rejectDateChangeController,
);

export default router;
