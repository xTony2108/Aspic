import express from "express";
import { verifyAccessToken } from "../../../middleware/verifyAccessToken";
import { meController } from "../../../controllers/admin/meController";
import { changePersonalDataController } from "../../../controllers/admin/changePersonalDataController";
import { changePasswordController } from "../../../controllers/admin/changePasswordController";
import { validateBody } from "../../../middleware/validateBody";
import {
  changeDateSchema,
  changePasswordSchema,
  personalDataSchema,
  registerProfessionalSchema,
} from "../../../schema/schemas";
import { activeSessionsController } from "../../../controllers/admin/activeSessionsController";
import { deleteSessionController } from "../../../controllers/admin/deleteSessionController";
import { getAppointmentsController } from "../../../controllers/admin/getAppointmentsController";
import { confirmAppointmentController } from "../../../controllers/admin/confirmAppointmentController";
import { registerController } from "../../../controllers/auth/registerController";
import { cancelAppointmentController } from "../../../controllers/admin/cancelAppointmentController";
import { changeAppointmentDateController } from "../../../controllers/admin/changeAppointmentDateController";
import { appointmentSuccessController } from "../../../controllers/admin/appointmentSuccessController";
import { getUsersController } from "../../../controllers/admin/getUsersController";

const router = express.Router();

router.use(verifyAccessToken);

/**
 * @path /api/admin/me
 * POST
 */

router.get("/me", meController);

/**
 * @path /api/admin/register
 * @METHOD POST
 */

router.post(
  "/register",
  validateBody(registerProfessionalSchema),
  registerController,
);

/**
 * @path /api/admin/personal
 * POST
 */

router.post(
  "/personal",
  validateBody(personalDataSchema),
  changePersonalDataController,
);

/**
 * @path /api/admin/password
 * POST
 */

router.post(
  "/password",
  validateBody(changePasswordSchema),
  changePasswordController,
);

/**
 * @path /api/admin/sessions
 * GET
 */

router.get("/sessions", activeSessionsController);

/**
 * @path /api/admin/sessions
 * DELETE
 */

router.delete("/sessions", deleteSessionController);

/**
 * @path /api/admin/appointments
 * GET
 */

router.get("/appointments", getAppointmentsController);

/**
 * @path /api/admin/appointments/confirm/:id
 * PATCH
 */

router.patch("/appointments/confirm/:id", confirmAppointmentController);

/**
 * @path /api/admin/appointments/cancel/:id
 * PATCH
 */

router.patch("/appointments/cancel/:id", cancelAppointmentController);

/**
 * @path /api/admin/appointments/change-date/:id
 * PATCH
 */

router.patch(
  "/appointments/change-date/:id",
  validateBody(changeDateSchema),
  changeAppointmentDateController,
);

/**
 * @path /api/admin/appointments/success
 * PATCH
 */

router.get("/appointments/success", appointmentSuccessController);

/**
 * @path /api/admin/getUsers
 * PATCH
 */

router.get("/getUsers", getUsersController);

export default router;
