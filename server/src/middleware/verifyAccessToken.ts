import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import RefreshToken from "../db/models/RefreshToken.js";
import { JwtPayload } from "jsonwebtoken";
import User from "../db/models/User.js";

interface MyJwtPayload extends JwtPayload {
  _id: string;
  jti: string;
}

const { JWT_SECRET } = process.env;

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Non autorizzato" });
  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as MyJwtPayload;

    const sessionExists = await RefreshToken.findOne(
      {
        jti: decoded?.jti,
        user_id: decoded?._id,
      },
      "_id",
      { lean: true },
    );

    if (!sessionExists)
      return res.status(401).json({ message: "Non autorizzato" });

    const user = await User.findById(decoded._id, "role status", {
      lean: true,
    });

    if (!user || user.status === "deleted")
      return res.status(401).json({ message: "Non autorizzato" });

    req.user = { ...decoded, role: user.role || "professional" };

    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      return res.status(401).json({ message: "Token scaduto" });
    if (error instanceof jwt.JsonWebTokenError)
      return res.status(401).json({ message: "Non autorizzato" });

    return res.status(500).json({ message: "Errore interno del server" });
  }
};
