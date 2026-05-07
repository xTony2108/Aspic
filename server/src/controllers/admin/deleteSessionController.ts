import { Request, Response } from "express";
import { deleteSessionByID } from "../../services/admin.js";

export const deleteSessionController = async (req: Request, res: Response) => {
  try {
    const { jti } = req.body;
    const { _id } = req.user;

    await deleteSessionByID(jti, _id);

    return res
      .status(200)
      .json({ message: "Sessione disconnessa con successo!" });
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
