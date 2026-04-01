import { Request, Response } from "express";
import User from "../../db/models/User";
import { logger } from "../../logger";

export const changePersonalDataController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { _id } = req.user;
    const body = req.body;
    logger.info(`[PERSONAL DATA] Request for user: ${_id}`);

    const user = await User.findById(_id, "", { lean: true });

    if (!user) return res.status(404).json({ message: "Utente non trovato" });

    await User.findByIdAndUpdate(_id, body);

    return res
      .status(200)
      .json({ message: "Dati personali modificati con successo!" });
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
