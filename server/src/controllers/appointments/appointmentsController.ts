import { type Response, type Request } from "express";
import { logger } from "../../logger.js";
import {
  createNewAppointmentService,
  getExistingAppointmentService,
} from "../../services/appointments.js";

export const appointmentsController = async (req: Request, res: Response) => {
  const { fiscalCode, firstName, lastName, email } = req.body;

  try {
    logger.info(
      `[BOOKING] Attempt for fiscal code: ${fiscalCode} (${firstName} ${lastName})`,
    );

    // Controllo duplicati per codice fiscale
    const existingAppointment = await getExistingAppointmentService(fiscalCode);

    if (existingAppointment) {
      logger.warn(`[BOOKING] Failed: duplicate fiscal code - ${fiscalCode}`);
      return res.status(400).json({
        message:
          "É già stata effettuata una richiesta con questo Codice Fiscale",
      });
    }

    const newAppointment = await createNewAppointmentService(req.body);

    logger.info(
      `[BOOKING] Created: ${newAppointment._id} for ${email} (${fiscalCode})`,
    );

    return res.status(201).json({
      message: "Richiesta inviata con successo!",
      appointmentId: newAppointment._id,
    });
  } catch (error) {
    if ((error as any).code === 11000) {
      logger.warn(`[BOOKING] Failed: duplicate fiscal code - ${fiscalCode}`);
      return res.status(400).json({
        message:
          "É già stata effettuata una richiesta con questo Codice Fiscale",
      });
    }

    logger.error(`[BOOKING] Error for ${fiscalCode}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
