import mongoose from "mongoose";
import { logger } from "../logger";
import { config } from "../config";

const connect = async () => {
  try {
    await mongoose.connect(config.MONGO_DB_URI);
    logger.info("[DB] MongoDB Atlas connected successfully");
  } catch (error) {
    logger.error(`[DB] Connection failed: ${error}`);
    throw error;
  }
};

export default connect;
