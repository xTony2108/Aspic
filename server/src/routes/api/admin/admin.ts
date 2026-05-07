import express from "express";
import { verifyAccessToken } from "../../../middleware/verifyAccessToken.js";
import { meController } from "../../../controllers/admin/meController.js";
import { changePersonalDataController } from "../../../controllers/admin/changePersonalDataController.js";
import { changePasswordController } from "../../../controllers/admin/changePasswordController.js";
import { validateBody } from "../../../middleware/validateBody.js";
import {
  changeDateSchema,
  changePasswordSchema,
  changePersonalDataDataSchema,
  registerProfessionalSchema,
} from "../../../schema/schemas.js";
import { activeSessionsController } from "../../../controllers/admin/activeSessionsController.js";
import { deleteSessionController } from "../../../controllers/admin/deleteSessionController.js";
import { getAppointmentsController } from "../../../controllers/admin/getAppointmentsController.js";
import { confirmAppointmentController } from "../../../controllers/admin/confirmAppointmentController.js";
import { registerController } from "../../../controllers/auth/registerController.js";
import { cancelAppointmentController } from "../../../controllers/admin/cancelAppointmentController.js";
import { changeAppointmentDateController } from "../../../controllers/admin/changeAppointmentDateController.js";
import { appointmentSuccessController } from "../../../controllers/admin/appointmentSuccessController.js";
import { getUsersController } from "../../../controllers/admin/getUsersController.js";
import { deleteUserController } from "../../../controllers/admin/deleteUserController.js";
const router = express.Router();

router.use(verifyAccessToken);

/**
 * @path /api/admin/me
 * GET
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
  validateBody(changePersonalDataDataSchema),
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

/**
 * @delete /api/admin/professionals/:id
 * DELETE
 */

router.delete("/professionals/:id", deleteUserController);

export default router;
