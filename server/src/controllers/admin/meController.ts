import { Request, Response } from "express";
import User from "../../db/models/User";

export const meController = async (req: Request, res: Response) => {
  const userId = req.user._id;

  try {
    const userData = await User.findById(
      userId,
      "-_id email firstName lastName phoneNumber passwordChanged",
      {
        lean: true,
      },
    );

    if (!userData) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    return res
      .status(200)
      .json({ message: "Dati recuperati con successo", userData });
  } catch (error) {
    return res.status(500).json({ message: "Errore generico" });
  }
};
