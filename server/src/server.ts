// CONNESSIONE AL DB E LISTEN

import app from "./app";
import connect from "./db";
import { config } from "./config";
import { logger } from "./logger";

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
