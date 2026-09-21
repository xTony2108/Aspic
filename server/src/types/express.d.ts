import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../db/models/User.js";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload & {
        _id: string;
        jti: string;
        role?: UserRole;
        refreshToken?: string;
        decoded?: JwtPayload & { _id: string; jti: string };
      };
    }
  }
}

export {};
