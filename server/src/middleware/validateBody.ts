import { NextFunction, Request, Response } from "express";
import z, { ZodType } from "zod";
import { logger } from "../logger";

export const validateBody = <T extends ZodType<any>>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const zodErrors = z.flattenError(parsed.error);
      logger.error(
        `[BOOKING] Error for ${req.body.fiscalCode}: ${JSON.stringify(zodErrors)}`,
      );

      return res.status(400).json({
        message: "Errore nella compilazione del form",
        errors: zodErrors,
      });
    }

    req.body = parsed.data;
    next();
  };
};
