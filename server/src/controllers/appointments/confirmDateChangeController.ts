import { Request, Response } from "express";
import {
  confirmPendingAppointmentDateChangeService,
  findAppointmentByPendingDateChangeTokenService,
} from "../../services/admin.js";

export const confirmDateChangeController = async (
  req: Request,
  res: Response,
) => {
  const { token } = req.body;

  try {
    const appointment =
      await findAppointmentByPendingDateChangeTokenService(token);

    if (!appointment || !appointment.pendingDateChange?.token)
      return res.status(404).json({ message: "Link non valido." });

    const expired =
      appointment.pendingDateChange.expiresAt &&
      new Date(appointment.pendingDateChange.expiresAt).getTime() < Date.now();

    if (expired)
      return res.status(410).json({ message: "Il link e scaduto." });

    if (
      !appointment.pendingDateChange.newDate ||
      !appointment.pendingDateChange.newTime ||
      !appointment.pendingDateChange.previousStatus
    )
      return res.status(409).json({ message: "Nessuna modifica da confermare." });

    const updatedAppointment = await confirmPendingAppointmentDateChangeService(
      token,
      appointment.pendingDateChange.newDate,
      appointment.pendingDateChange.newTime,
      appointment.pendingDateChange.previousStatus,
    );

    if (!updatedAppointment)
      return res.status(409).json({ message: "La modifica e gia stata gestita." });

    return res.status(200).json({
      message: "Nuova data confermata con successo!",
    });
  } catch {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
