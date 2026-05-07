import { Request, Response } from "express";
import { logger } from "../../logger.js";
import {
  findUserByIDService,
  updateUserDataService,
} from "../../services/admin.js";

export const changePersonalDataController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { _id } = req.user;
    const body = req.body as {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
    };
    logger.info(`[PERSONAL DATA] Request for user: ${_id}`);

    const user = await findUserByIDService(_id);

    if (!user) return res.status(404).json({ message: "Utente non trovato" });

    await updateUserDataService(_id, body);

    return res
      .status(200)
      .json({ message: "Dati personali modificati con successo!" });
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
