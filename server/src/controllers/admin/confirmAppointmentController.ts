import { Request, Response } from "express";
import {
  createStripeSession,
  findAppointmentByID,
  findUserStripeDataByIDService,
  updateAppointmentStatus,
} from "../../services/admin.js";
import { sendEmail } from "../../emails/sendEmail.js";
import { createElement } from "react";
import PayementRequest from "../../emails/templates/PayementRequest.jsx";

export const confirmAppointmentController = async (
  req: Request,
  res: Response,
) => {
  const { _id: professionalID } = req.user;

  const { id: appointmentID } = req.params;
  const { status } = req.body;

  try {
    if (!appointmentID)
      return res.status(400).json({ message: "Appuntamento non definito" });

    if (status !== "awaiting_payment")
      return res.status(400).json({ message: "Stato non valido" });

    const appointment = await findAppointmentByID(appointmentID.toString());

    if (!appointment)
      return res.status(404).json({ message: "Appuntamento non trovato" });

    if (
      appointment?.assignedTo &&
      appointment.assignedTo.toString() !== professionalID.toString()
    )
      return res.status(403).json({ message: "Non autorizzato" });

    const searchFields = { _id: appointmentID };
    const updateFields = { status, assignedTo: professionalID };

    const assignee = await findUserStripeDataByIDService(professionalID);

    if (
      !assignee?.stripeAccountId ||
      !assignee.stripeOnboardingCompleted ||
      !assignee.stripeChargesEnabled ||
      !assignee.stripePayoutsEnabled
    )
      return res
        .status(400)
        .json({ message: "Professionista non configurato per i pagamenti" });

    const appointmentInfo = {
      service: appointment.service,
      price: appointment.price,
      date: appointment.appointmentDate,
      time: appointment.appointmentTime,
      appointmentID: appointment._id.toString(),
      professionalID,
      stripeAccountId: assignee.stripeAccountId,
      clientEmail: appointment.email,
    };

    const session = await createStripeSession(appointmentInfo);

    if (!assignee?.stripeAccountId)
      return res
        .status(400)
        .json({ message: "Professionista non configurato per i pagamenti" });

    await sendEmail(
      `Appuntamento confermato – ${appointment.protocolNumber}`,
      createElement(PayementRequest, {
        firstName: appointment.firstName,
        service: appointment.service,
        date: appointment.appointmentDate.toLocaleDateString(),
        time: appointment.appointmentTime,
        appointmentMode: appointment.appointmentMode,
        amount: 80,
        protocolNumber: appointment.protocolNumber,
        professionalName: assignee
          ? `${assignee.firstName} ${assignee.lastName}`
          : "",
        paymentUrl: session.url!,
        paymentExpiresAt: new Date(
          session.expires_at * 1000,
        ).toLocaleDateString(),
      }),
      appointment.email,
    );

    await updateAppointmentStatus(searchFields, updateFields);

    return res.status(200).json({
      message:
        "Richiesta presa in carico e link pagamento inviato con successo!",
    });
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
