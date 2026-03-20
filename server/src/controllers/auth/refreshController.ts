import { Request, Response } from "express";
import User from "../../db/models/User";
import { generateAccessToken } from "../../helpers/generateJWTTokens";
import { createHash } from "node:crypto";

export const refreshController = async (req: Request, res: Response) => {
  const { decoded, refreshToken } = req.user;
  try {
    // Controllo se l'utente esiste
    const hashedToken = createHash("sha256").update(refreshToken).digest("hex");

    const user = await User.findOne(
      { _id: decoded._id, refreshToken: hashedToken },
      "refreshToken",
      {
        lean: true,
      },
    );

    if (!user) return res.status(401).json({ message: "Non sei autorizzato" });

    const accessToken = generateAccessToken({ _id: decoded._id });

    return res
      .status(200)
      .json({ message: "Refresh ok", accessToken: accessToken });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Errore generico" });
  }
};
