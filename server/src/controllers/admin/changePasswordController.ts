import { Request, Response } from "express";
import User from "../../db/models/User";
import bcrypt from "bcrypt";
import { logger } from "../../logger";

export const changePasswordController = async (req: Request, res: Response) => {
  const { _id } = req.user;

  try {
    const { password, oldPassword } = req.body;

    logger.info(`[PASSWORD] Change attempt for user: ${_id}`);

    // Validazione input
    if (!password || !oldPassword) {
      logger.warn(`[PASSWORD] Failed: missing fields - user: ${_id}`);
      return res
        .status(400)
        .json({ message: "Tutti i campi sono obbligatori" });
    }

    const user = await User.findById(_id, "password", { lean: true });

    if (!user) {
      logger.warn(`[PASSWORD] Failed: user not found - ${_id}`);
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Verifica password attuale
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      logger.warn(`[PASSWORD] Failed: wrong old password - user: ${_id}`);
      return res.status(400).json({ message: "Password attuale errata" });
    }

    // Hash nuova password
    const newHashedPassword = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(_id, {
      password: newHashedPassword,
      passwordChanged: true,
    });

    logger.info(`[PASSWORD] Changed successfully for user: ${_id}`);

    return res.status(200).json({
      message: "Password modificata con successo!",
    });
  } catch (error) {
    logger.error(`[PASSWORD] Error for user ${_id}: ${error}`);
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
