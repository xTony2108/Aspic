import express from "express";
import { loginController } from "../../controllers/auth/loginController";
import { registerController } from "../../controllers/auth/registerController";
import { verifyController } from "../../controllers/auth/verifyController";
import { verifyResendController } from "../../controllers/auth/verifyResendController";
import { refreshController } from "../../controllers/auth/refreshController";
import { verifyRefreshToken } from "../../middleware/verifyRefreshToken";

const router = express.Router();

/**
 * @path /api/auth/login
 * @METHOD POST
 */

router.post("/login", loginController);

/**
 * @path /api/auth/register
 * @METHOD POST
 */

router.post("/register", registerController);

/**
 * @path /api/auth/verify
 * @METHOD POST
 */

router.post("/verify", verifyController);

/**
 * @path /api/auth/verify
 * @METHOD POST
 */

router.post("/verify/resend", verifyResendController);

/**
 * @path /api/auth/verify
 * @METHOD GET
 */

router.get("/refresh", verifyRefreshToken, refreshController);

export default router;
