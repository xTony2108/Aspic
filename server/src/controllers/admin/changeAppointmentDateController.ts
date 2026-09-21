import { Request, Response } from "express";
import {
  findAppointmentByID,
  updateAppointmentDate,
  updateAppointmentDateStatus,
} from "../../services/admin.js";
import { sendEmail } from "../../emails/sendEmail.js";
import { createElement } from "react";
import AppointmentDateChange from "../../emails/templates/AppointmentDateChange.js";
import { config } from "../../config.js";

export const changeAppointmentDateController = async (
  req: Request,
  res: Response,
) => {
  const { _id } = req.user;

  const { id: appointmentID } = req.params;
  const { newDate, newTime } = req.body;

  try {
    if (!appointmentID)
      return res.status(400).json({ message: "Appuntamento non definito" });

    const appointment = await findAppointmentByID(appointmentID.toString());

    if (!appointment)
      return res.status(404).json({ message: "Appuntamento non trovato" });

    if (
      appointment?.assignedTo &&
      appointment.assignedTo.toString() !== _id.toString()
    )
      return res.status(403).json({ message: "Non autorizzato" });

    const updateFields = {
      newDate,
      newTime,
      previousStatus: appointment.status,
    };

    const updatedAppointment = await updateAppointmentDate(
      appointmentID.toString(),
      updateFields,
    );

    if (
      !updatedAppointment?.pendingDateChange ||
      !updatedAppointment?.pendingDateChange.token ||
      !updatedAppointment?.pendingDateChange.expiresAt ||
      !updatedAppointment?.pendingDateChange.newDate ||
      !updatedAppointment?.pendingDateChange.newTime
    )
      return res
        .status(403)
        .json({ message: "Errore durante la modifica della data" });

    // link per email
    const confirmUrl = `${config.ORIGIN}/appuntamento/conferma-data#token=${updatedAppointment.pendingDateChange.token}`;
    const rejectUrl = `${config.ORIGIN}/appuntamento/rifiuta-data#token=${updatedAppointment.pendingDateChange.token}`;
    await sendEmail(
      `Modifica della data dell'appuntamento – ${appointment.protocolNumber}`,
      createElement(AppointmentDateChange, {
        firstName: appointment.firstName,
        service: appointment.service,
        oldDate: appointment.appointmentDate.toLocaleDateString(),
        oldTime: appointment.appointmentTime,
        newDate:
          updatedAppointment?.pendingDateChange?.newDate.toLocaleDateString(),
        newTime: updatedAppointment?.pendingDateChange?.newTime,
        clientType: appointment.clientType,
        protocolNumber: appointment.protocolNumber,
        confirmUrl: confirmUrl,
        rejectUrl: rejectUrl,
        expiresAt:
          updatedAppointment?.pendingDateChange.expiresAt.toLocaleDateString(),
      }),
      appointment.email,
    );

    await updateAppointmentDateStatus(appointmentID.toString());

    return res
      .status(200)
      .json({ message: "Modifica della data effettuata con successo!" });
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
