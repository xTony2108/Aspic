import { Request, Response } from "express";
import Slot from "../../db/models/Slot.js";
import mongoose from "mongoose";

export const deleteSlotController = async (req: Request, res: Response) => {
  try {
    const { date, time } = req.params;
    const professionalId = new mongoose.Types.ObjectId(req.user._id);

    const doc = await Slot.findOneAndUpdate(
      {
        professionalId,
        date,
      },
      {
        $pull: {
          slots: { time },
        },
      },
      {
        new: true,
      },
    );

    if (!doc) {
      return res.status(404).json({ message: "Slot non trovato" });
    }

    if (doc.slots.length === 0) {
      await Slot.deleteOne({
        professionalId,
        date,
      });
    }

    return res.status(200).json({ message: "Slot rimosso" });
  } catch (error) {
    return res.status(500).json({ error: "Errore interno del server" });
  }
};
