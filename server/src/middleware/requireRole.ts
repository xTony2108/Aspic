import { NextFunction, Request, Response } from "express";
import { UserRole } from "../db/models/User.js";

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Non autorizzato" });
    }

    return next();
  };
};
