import dotenv from "dotenv";

dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import apiRoute from "./routes/api/index";
import webhooksRoute from "./routes/webhooks/index";
import cookieParser from "cookie-parser";
import { httpLogger, morganMiddleware } from "./logger";
import { config } from "./config";
import path from "node:path";

const app = express();

app.use(morganMiddleware);
app.use(httpLogger);

app.set("trust proxy", 1);

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:"],
          connectSrc: ["'self'"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      crossOriginResourcePolicy: { policy: "same-origin" },
      referrerPolicy: { policy: "no-referrer" },
      frameguard: { action: "deny" },
    }),
  );
} else {
  app.use(helmet());
}
const isDev = config.NODE_ENV === "development";
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: isDev ? config.ORIGIN : config.ORIGIN_DEV,
    credentials: true,
  }),
);
app.use(cookieParser());

// routes
/**
 * @path /api
 */

app.use("/api", apiRoute);

/**
 * @path /webhook
 */

app.use("/webhooks", webhooksRoute);

export default app;
