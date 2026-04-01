import { Request, Response } from "express";
import { generateAccessToken } from "../../helpers/generateJWTTokens";
import { createHash } from "node:crypto";
import RefreshToken from "../../db/models/RefreshToken";
import { logger } from "../../logger";

export const refreshController = async (req: Request, res: Response) => {
  const { decoded, refreshToken } = req.user;

  try {
    logger.info(`[REFRESH] Token refresh attempt for user: ${decoded._id}`);

    // Controllo se l'utente esiste
    const hashedToken = createHash("sha256").update(refreshToken).digest("hex");

    const tokenRecord = await RefreshToken.findOne(
      { jti: decoded.jti, expires_at: { $gt: new Date() } },
      "refresh_token_hash",
      { lean: true },
    );

    if (!tokenRecord) {
      logger.warn(
        `[REFRESH] Failed: token record not found - JTI: ${decoded.jti}`,
      );
      return res.status(401).json({ message: "Non sei autorizzato" });
    }

    if (tokenRecord.refresh_token_hash !== hashedToken) {
      logger.warn(
        `[REFRESH] Failed: token hash mismatch - JTI: ${decoded.jti}`,
      );
      return res.status(401).json({ message: "Token non valido" });
    }

    const accessToken = generateAccessToken({
      _id: decoded._id,
      jti: decoded.jti,
    });

    logger.info(
      `[REFRESH] Token refreshed successfully for user: ${decoded._id}`,
    );

    return res.status(200).json({
      message: "Refresh ok",
      accessToken: accessToken,
    });
  } catch (error) {
    logger.error(`[REFRESH] Error for user ${decoded._id}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
