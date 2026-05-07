import { Request, Response } from "express";
import { logger } from "../../logger.js";
import { refreshTokenService } from "../../services/auth.js";

export const refreshController = async (req: Request, res: Response) => {
  const { decoded, refreshToken } = req.user;

  try {
    logger.info(`[REFRESH] Token refresh attempt for user: ${decoded._id}`);

    const accessToken = await refreshTokenService(refreshToken, decoded);

    logger.info(
      `[REFRESH] Token refreshed successfully for user: ${decoded._id}`,
    );

    return res.status(200).json({
      message: "Refresh ok",
      accessToken: accessToken,
    });
  } catch (error) {
    logger.error(`[REFRESH] Error for user ${decoded._id}: ${error}`);
    if (
      error instanceof Error &&
      (error?.message === "TOKEN_NOT_FOUND" ||
        error?.message === "TOKEN_INVALID")
    ) {
      return res.status(401).json({ message: "Token non valido" });
    }
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
