import { Request, Response } from "express";
import User from "../../db/models/User.js";
import Appointment from "../../db/models/Appointment.js";
import { stripe } from "../../lib/stripe/stripe.js";

export const deleteUserController = async (req: Request, res: Response) => {
  const professionalId = req.params.id;

  try {
    const professional = await User.findById(professionalId);

    if (!professional) {
      return res.status(404).json({ error: "Professionista non trovato." });
    }

    const activeAppointments = await Appointment.find({
      assignedTo: professional._id,
      status: { $in: ["paid", "awaiting_payment"] },
    });

    if (activeAppointments.length > 0) {
      return res.status(400).json({
        error: "Il professionista ha appuntamenti attivi.",
        count: activeAppointments.length,
      });
    }

    if (professional.stripeAccountId) {
      try {
        await stripe.accounts.del(professional.stripeAccountId);
      } catch (stripeErr: any) {
        return res.status(400).json({
          error:
            "Non è possibile cancellare l'account Stripe. Verifica che il saldo sia zero.",
          details: stripeErr.message,
        });
      }
    }

    await User.findByIdAndUpdate(professionalId, {
      status: "deleted",
      deletedAt: new Date(),
      firstName: "Deleted",
      lastName: "User",
      email: `deleted_${Date.now()}@removed.com`,
      fiscalCode: `DELETED_${Date.now()}`,
      phoneNumber: "0000000000",
      password: "REDACTED_" + Date.now(),
    });

    return res.status(200).json({
      message: "Professionista cancellato e anonimizzato con successo.",
    });
  } catch (err) {
    console.error("Errore durante la cancellazione:", err);
    return res.status(500).json({ error: "Errore interno del server." });
  }
};
