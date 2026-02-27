import express from "express";
import { consulenzaController } from "../../controllers/consulenzaController";
import { valutazioneController } from "../../controllers/valutazioneController";

const router = express.Router();

/**
 * @path /api/requests/consulenza
 * @method POST
 */

router.post("/consulenza", consulenzaController);

/**
 * @path /api/requests/valutazione
 * @method POST
 */

router.post("/consulenza", valutazioneController);

export default router;
