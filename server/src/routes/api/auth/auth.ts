import express from "express";
import { loginController } from "../../../controllers/auth/loginController.js";
import { verifyEmailController } from "../../../controllers/auth/verifyEmailController.js";
import { verifyResendController } from "../../../controllers/auth/verifyResendController.js";
import { refreshController } from "../../../controllers/auth/refreshController.js";
import { verifyRefreshToken } from "../../../middleware/verifyRefreshToken.js";
import { validateBody } from "../../../middleware/validateBody.js";
import {
  activateAccountSchema,
  loginSchema,
  verificationTokenSchema,
} from "../../../schema/schemas.js";
import { verifyAccessToken } from "../../../middleware/verifyAccessToken.js";
import { logoutController } from "../../../controllers/auth/logoutController.js";
import { logoutAllController } from "../../../controllers/auth/logoutAllController.js";

const router = express.Router();

/**
 * @path /api/auth/login
 * @METHOD POST
 */

router.post("/login", validateBody(loginSchema), loginController);

/**
 * @path /api/auth/logout
 * @METHOD POST
 */

router.post("/logout", verifyAccessToken, logoutController);

/**
 * @path /api/auth/logout-all
 * @METHOD POST
 */

router.post("/logout-all", verifyAccessToken, logoutAllController);

/**
 * @path /api/auth/verify
 * @METHOD POST
 */

router.post("/verify", validateBody(activateAccountSchema), verifyEmailController);

/**
 * @path /api/auth/verify
 * @METHOD POST
 */

router.post(
  "/verify/resend",
  validateBody(verificationTokenSchema),
  verifyResendController,
);

/**
 * @path /api/auth/refresh
 * @METHOD GET
 */

router.get("/refresh", verifyRefreshToken, refreshController);

export default router;
