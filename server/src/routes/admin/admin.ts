import express from "express";
import { verifyAccessToken } from "../../middleware/verifyAccessToken";
import { meController } from "../../controllers/admin/meController";
import { personalDataController } from "../../controllers/admin/personalDataController";

const router = express.Router();

/**
 * @path admin/me
 * POST
 */

router.get("/me", verifyAccessToken, meController);

/**
 * @path admin/personalData
 * POST
 */

router.get("/personalData", verifyAccessToken, personalDataController);

export default router;
