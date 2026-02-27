import { type Response, type Request } from "express";
import {
  consulenzaSchema,
  valutazioneSchema,
  type ValutazioneTypeSchema,
} from "../schema/schemas";
import z from "zod";

export const valutazioneController = (req: Request, res: Response) => {
  const parsed = valutazioneSchema.safeParse(req.body as ValutazioneTypeSchema);

  if (!parsed.success) {
    const zodErrors = z.flattenError(parsed.error);

    return res
      .status(400)
      .json({ message: "Sono presenti errori", errors: zodErrors });
  }

  return res.status(201).json({ message: "Richiesta inviata con successo!" });
};
