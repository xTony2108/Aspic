import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const { JWT_REFRESH_SECRET } = process.env;

export const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken)
    return res.status(401).json({ message: "Non autorizzato" });
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    req.user = { decoded, refreshToken };

    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      return res.status(401).json({ message: "Token scaduto" });
    if (error instanceof jwt.JsonWebTokenError)
      return res.status(401).json({ message: "Non autorizzato" });

    return res.status(500).json({ message: "Errore interno del server" });
  }
};
