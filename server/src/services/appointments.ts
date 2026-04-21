import { createElement } from "react";
import Appointment from "../db/models/Appointment";
import Counter from "../db/models/Counter";
import { sendEmail } from "../emails/sendEmail";
import AppointmentReceived from "../emails/templates/AppointmentReceived";
import { BaseTypeSchema } from "../schema/schemas";
import { getServicePrice } from "../utility/getPrices";

export const getExistingAppointmentService = async (fiscalCode: string) => {
  return Appointment.findOne({ fiscalCode }, "fiscalCode", {
    lean: true,
  });
};

export const createNewAppointmentService = async (data: BaseTypeSchema) => {
  const session = await Appointment.startSession();

  try {
    let appointment:
      | Awaited<ReturnType<typeof Appointment.create>>[0]
      | undefined;

    await session.withTransaction(async () => {
      const year = new Date().getFullYear();
      const counter = await Counter.findOneAndUpdate(
        { year },
        { $inc: { seq: 1 } },
        { new: true, upsert: true, session },
      );

      const price = getServicePrice(data.service);
      if (!price) throw new Error("Servizio non valido");

      const protocolNumber = `ASPICRC-${year}/${String(counter.seq).padStart(4, "0")}`;
      [appointment] = await Appointment.create(
        [{ ...data, protocolNumber, price }],
        {
          session,
        },
      );
    });

    if (!appointment)
      throw new Error("Errore durante la creazione dell'appuntamento");

    await sendEmail(
      `Richiesta ricevuta - ${appointment.protocolNumber}`,
      createElement(AppointmentReceived, {
        firstName: appointment.firstName,
        service: appointment.service,
        date: appointment.appointmentDate.toLocaleDateString(),
        time: appointment.appointmentTime,
        clientType: appointment.clientType,
        urgent: appointment.urgent,
        protocolNumber: appointment.protocolNumber,
      }),
      appointment.email,
    );

    return appointment;
  } finally {
    session.endSession();
  }
};
