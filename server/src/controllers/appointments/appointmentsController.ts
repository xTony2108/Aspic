import { type Response, type Request } from "express";
import { logger } from "../../logger.js";
import {
  createNewAppointmentService,
  getExistingAppointmentService,
} from "../../services/appointments.js";

export const appointmentsController = async (req: Request, res: Response) => {
  const { fiscalCode } = req.body;

  try {
    // Controllo duplicati per codice fiscale
    const existingAppointment = await getExistingAppointmentService(fiscalCode);

    if (existingAppointment) {
      logger.warn(`[BOOKING] Failed: duplicate fiscal code`);
      return res.status(400).json({
        message:
          "Se i dati sono validi, la richiesta è stata/sarà presa in carico e riceverai comunicazioni via email",
      });
    }

    const newAppointment = await createNewAppointmentService(req.body);

    logger.info(`[BOOKING] Created: ${newAppointment._id})`);

    return res.status(201).json({
      message: "Richiesta inviata con successo!",
      appointmentId: newAppointment._id,
    });
  } catch (error) {
    if ((error as any).code === 11000) {
      logger.warn(`[BOOKING] Failed: duplicate fiscal code`);
      return res.status(400).json({
        message:
          "É già stata effettuata una richiesta con questo Codice Fiscale",
      });
    }

    return res.status(500).json({ message: "Errore interno del server" });
  }
};
