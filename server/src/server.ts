// CONNESSIONE AL DB E LISTEN
import "dotenv/config";

import app from "./app.js";
import connect from "./db/index.js";
import { config } from "./config.js";
import { logger } from "./logger.js";

const startServer = async () => {
  try {
    await connect();
    app.listen(config.SERVER_PORT, "0.0.0.0", () => {
      logger.info(
        `[SERVER] Running on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`,
      );
    });
  } catch (error) {
    logger.error(`[SERVER] Startup failed: ${error}`);
    process.exit(1);
  }
};

startServer();
