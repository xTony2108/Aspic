import { Request, Response } from "express";
import {
  findAppointmentByPendingDateChangeTokenService,
  rejectPendingAppointmentDateChangeService,
} from "../../services/admin.js";

export const rejectDateChangeController = async (
  req: Request,
  res: Response,
) => {
  const { token } = req.body;

  try {
    const appointment =
      await findAppointmentByPendingDateChangeTokenService(token);
    console.log(appointment);

    if (!appointment || !appointment.pendingDateChange?.token)
      return res.status(404).json({ message: "Link non valido." });

    const expired =
      appointment.pendingDateChange.expiresAt &&
      new Date(appointment.pendingDateChange.expiresAt).getTime() < Date.now();

    if (expired) return res.status(410).json({ message: "Il link e scaduto." });

    const updatedAppointment =
      await rejectPendingAppointmentDateChangeService(token);

    if (!updatedAppointment)
      return res
        .status(409)
        .json({ message: "La modifica e gia stata gestita." });

    return res.status(200).json({
      message: "Richiesta annullata con successo.",
    });
  } catch {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
