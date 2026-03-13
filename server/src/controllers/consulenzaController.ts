import { type Response, type Request } from "express";
import { consulenzaSchema, type ConsulenzaTypeSchema } from "../schema/schemas";
import z from "zod";

export const consulenzaController = (req: Request, res: Response) => {
  const parsed = consulenzaSchema.safeParse(req.body as ConsulenzaTypeSchema);

  if (!parsed.success) {
    const zodErrors = z.flattenError(parsed.error);

    return res
      .status(400)
      .json({ message: "Sono presenti errori", errors: zodErrors });
  }

  return res.status(201).json({ message: "Richiesta inviata con successo!" });
};
