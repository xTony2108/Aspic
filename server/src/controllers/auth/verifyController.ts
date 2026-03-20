import { Request, Response } from "express";
import User from "../../db/models/User";

export const verifyController = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const user = await User.findOne(
      { emailVerificationToken: token },
      "emailVerified emailVerificationExpires",
      { lean: true },
    );

    if (!user) return res.status(404).json({ message: "Link non valido." });

    const tokenScaduto =
      user?.emailVerificationExpires &&
      new Date(user?.emailVerificationExpires).getTime() < Date.now();

    if (tokenScaduto)
      return res.status(410).json({ message: "Il link è scaduto." });

    await User.updateOne(
      { emailVerificationToken: token },
      {
        emailVerificationToken: null,
        emailVerificationExpires: null,
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
    );

    return res
      .status(200)
      .json({ message: "Verifica effettuata con successo!" });
  } catch (error) {
    return res.status(500).json({ message: "Errore generico" });
  }
};
