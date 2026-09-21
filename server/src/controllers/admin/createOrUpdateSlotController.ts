import { Request, Response } from "express";
import Slot from "../../db/models/Slot.js";
import mongoose from "mongoose";

export const createOrUpdateSlot = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const professionalId = new mongoose.Types.ObjectId(req.user._id);

    const existing = await Slot.findOne({
      professionalId,
      date: data.date,
      "slots.time": data.time,
    });

    if (existing) {
      return res.status(409).json({
        message: "Slot già esistente",
      });
    }

    await Slot.findOneAndUpdate(
      {
        professionalId,
        date: data.date,
      },
      {
        $addToSet: {
          slots: {
            time: data.time,
          },
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      },
    );

    res.status(201).json({ message: "Slot aggiunto" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Errore interno del server" });
  }
};
