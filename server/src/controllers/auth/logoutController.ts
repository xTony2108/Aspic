import { Request, Response } from "express";
import { logger } from "../../logger.js";
import { logoutService } from "../../services/auth.js";

export const logoutController = async (req: Request, res: Response) => {
  const { jti, _id } = req.user;

  try {
    logger.info(`[LOGOUT] Attempt for user: ${_id} (JTI: ${jti})`);

    const deletedToken = await logoutService(jti);

    if (!deletedToken) {
      logger.warn(`[LOGOUT] Token not found - JTI: ${jti}`);
    } else {
      logger.info(`[LOGOUT] Successful for user: ${_id}`);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logout effettuato con successo!" });
  } catch (error) {
    logger.error(`[LOGOUT] Error for user ${_id}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
