import { Request, Response } from "express";
import {
  findAppointmentByID,
  updateAppointmentStatus,
} from "../../services/auth";
import { sendEmail } from "../../emails/sendEmail";
import AppointmentCancelled from "../../emails/templates/AppointmentCancelled";
import { createElement } from "react";

export const cancelAppointmentController = async (
  req: Request,
  res: Response,
) => {
  const { _id } = req.user;

  const { id: appointmentID } = req.params;
  const { status } = req.body;

  try {
    if (!appointmentID)
      return res.status(400).json({ message: "Appuntamento non definito" });

    if (status !== "cancelled")
      return res.status(400).json({ message: "Stato non valido" });

    const searchFields: Record<string, unknown> = { _id: appointmentID };

    const appointment = await findAppointmentByID(appointmentID.toString());

    if (!appointment)
      return res.status(404).json({ message: "Appuntamento non trovato" });

    if (
      appointment?.assignedTo &&
      appointment.assignedTo.toString() !== _id.toString()
    )
      return res.status(403).json({ message: "Non autorizzato" });

    const updateFields: Record<string, unknown> = {
      status,
      firstName: "Anonimizzato",
      lastName: "Anonimizzato",
      address: "Anonimizzato",
      fiscalCode: `ANNULLATO-${appointment.protocolNumber}`,
      email: "Anonimizzato",
      phoneNumber: "Anonimizzato",
      reason: "Anonimizzato",
      birthday: "Anonimizzato",
      birthPlace: "Anonimizzato",
    };

    await sendEmail(
      `Appuntamento annullato – ${appointment.protocolNumber}`,
      createElement(AppointmentCancelled, {
        firstName: appointment.firstName,
        service: appointment.service,
        date: appointment.appointmentDate.toLocaleDateString(),
        time: appointment.appointmentTime,
        clientType: appointment.clientType,
        protocolNumber: appointment.protocolNumber,
      }),
      appointment.email,
    );
    await updateAppointmentStatus(searchFields, updateFields);

    return res
      .status(200)
      .json({ message: "Appuntamento annullato con successo!" });
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
