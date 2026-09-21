import { NextFunction, Request, Response } from "express";
import z, { ZodType } from "zod";
import { logger } from "../logger.js";

export const validateBody = <T extends ZodType<any>>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const zodErrors = z.flattenError(parsed.error);
      logger.warn(`[VALIDATION] Body validation failed: ${req.path}`);

      return res.status(400).json({
        message: "Errore nella compilazione del form",
        errors: zodErrors,
      });
    }

    req.body = parsed.data;
    next();
  };
};
