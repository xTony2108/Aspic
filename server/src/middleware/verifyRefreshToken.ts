import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface RefreshJwtPayload extends jwt.JwtPayload {
  _id: string;
  jti: string;
}

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

    if (typeof decoded === "string" || !decoded._id || !decoded.jti)
      return res.status(401).json({ message: "Non autorizzato" });

    const refreshPayload = decoded as RefreshJwtPayload;

    req.user = { ...refreshPayload, decoded: refreshPayload, refreshToken };

    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      return res.status(401).json({ message: "Token scaduto" });
    if (error instanceof jwt.JsonWebTokenError)
      return res.status(401).json({ message: "Non autorizzato" });

    return res.status(500).json({ message: "Errore interno del server" });
  }
};
