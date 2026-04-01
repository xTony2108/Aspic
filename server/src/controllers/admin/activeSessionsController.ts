import { Request, Response } from "express";
import RefreshToken from "../../db/models/RefreshToken";

export const activeSessionsController = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;

    const sessions = await RefreshToken.find(
      { user_id: _id, expires_at: { $gt: new Date() } },
      "device_info jti createdAt",
      {
        lean: true,
      },
    );

    return res.status(200).json({
      message: "Sessioni recuperate",
      sessions: sessions.map((s) => ({
        device_name: s.device_info?.device_name,
        ip: s.device_info?.ip,
        createdAt: s.createdAt,
        jti: s.jti,
        current: s.jti === req.user.jti,
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
