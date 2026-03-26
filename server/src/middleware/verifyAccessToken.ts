import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!JWT_SECRET)
    throw new Error("Variabile d'ambiente JWT_SECRET non definita");

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Non autorizzato" });
  try {
    const token = authHeader.split(" ")[1];
    console.log(token);

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    return next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.TokenExpiredError)
      return res.status(401).json({ message: "Token scaduto" });
    if (error instanceof jwt.JsonWebTokenError)
      return res.status(401).json({ message: "Non autorizzato" });

    return res.status(500).json({ message: "Errore generico del server" });
  }
};
