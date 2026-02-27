import express from "express";
import requestsRoute from "./requests/requests";

const router = express.Router();

/**
 * @path /api/requests
 */

router.use("/requests", requestsRoute);

export default router;
