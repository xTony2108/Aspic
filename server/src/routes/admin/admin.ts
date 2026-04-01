import express from "express";
import { verifyAccessToken } from "../../middleware/verifyAccessToken";
import { meController } from "../../controllers/admin/meController";
import { changePersonalDataController } from "../../controllers/admin/changePersonalDataController";
import { changePasswordController } from "../../controllers/admin/changePasswordController";
import { validateBody } from "../../middleware/validateBody";
import { changePasswordSchema, personalDataSchema } from "../../schema/schemas";
import { activeSessionsController } from "../../controllers/admin/activeSessionsController";
import { deleteSessionController } from "../../controllers/admin/deleteSessionController";
import { registerController } from "../../controllers/auth/registerController";

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

router.post("/register", registerController);

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

export default router;
