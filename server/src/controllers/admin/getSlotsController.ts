import { Request, Response } from "express";
import Slot from "../../db/models/Slot.js";
import mongoose from "mongoose";

export const getSlotsController = async (req: Request, res: Response) => {
  try {
    const professionalId = new mongoose.Types.ObjectId(req.user._id);
    const today = new Date().toISOString().split("T")[0];

    const days = await Slot.find(
      {
        professionalId,
        date: { $gte: today },
      },
      { date: 1, slots: 1 },
    ).sort({ date: 1 });
    console.log(days);

    return res.status(200).json({ message: "Slot recuperati", days });
  } catch (error) {
    return res.status(500).json({ error: "Errore interno del server" });
  }
};
