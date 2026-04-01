import express from "express";
import { loginController } from "../../controllers/auth/loginController";
import { registerController } from "../../controllers/auth/registerController";
import { verifyEmailController } from "../../controllers/auth/verifyEmailController";
import { verifyResendController } from "../../controllers/auth/verifyResendController";
import { refreshController } from "../../controllers/auth/refreshController";
import { verifyRefreshToken } from "../../middleware/verifyRefreshToken";
import { validateBody } from "../../middleware/validateBody";
import { loginSchema } from "../../schema/schemas";
import { verifyAccessToken } from "../../middleware/verifyAccessToken";
import { logoutController } from "../../controllers/auth/logoutController";
import { logoutAllController } from "../../controllers/auth/logoutAllController";

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

router.post("/verify", verifyEmailController);

/**
 * @path /api/auth/verify
 * @METHOD POST
 */

router.post("/verify/resend", verifyResendController);

/**
 * @path /api/auth/refresh
 * @METHOD GET
 */

router.get("/refresh", verifyRefreshToken, refreshController);

export default router;
