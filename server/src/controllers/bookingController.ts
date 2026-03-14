import { type Response, type Request } from "express";
import { baseSchema, type BaseTypeSchema } from "../schema/schemas";
import z from "zod";
import Appointment from "../db/models/Appointment";

export const bookingController = async (req: Request, res: Response) => {
  const parsed = baseSchema.safeParse(req.body as BaseTypeSchema);

  if (!parsed.success) {
    const zodErrors = z.flattenError(parsed.error);

    return res
      .status(400)
      .json({ message: "Sono presenti errori", errors: zodErrors });
  }

  const fiscalCode = await Appointment.findOne(
    {
      fiscalCode: parsed.data.fiscalCode,
    },
    "fiscalCode",
    { lean: true },
  );

  if (fiscalCode)
    return res.status(400).json({
      message: "É già stata effettuata una richiesta con questo Codice Fiscale",
    });

  await Appointment.create(req.body);
  return res.status(201).json({ message: "Richiesta inviata con successo!" });
};
