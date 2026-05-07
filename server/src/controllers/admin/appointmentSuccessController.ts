import { Request, Response } from "express";
import Appointment from "../../db/models/Appointment.js";

export const appointmentSuccessController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { session_id } = req.params;

    await Appointment.findOne(
      { "pendingDateChange.token": session_id },
      "expires_at ",
    );
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
