import { NextFunction, Request, Response } from "express";
import z, { ZodType } from "zod";

export const validateBody = <T extends ZodType<any>>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const zodErrors = z.flattenError(parsed.error);

      return res.status(400).json({
        message: "Errore nella compilazione del form",
        errors: zodErrors,
      });
    }

    req.body = parsed.data;
    next();
  };
};
