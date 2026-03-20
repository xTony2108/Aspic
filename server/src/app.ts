import dotenv from "dotenv";

dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import apiRoute from "./routes/index";
import cookieParser from "cookie-parser";

const app = express();

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));
app.use(cookieParser());

// routes
/**
 * @path /api
 */

app.use("/api", apiRoute);

app.get("/a", (req, res) => {
  try {
    return res.status(200).json({ message: "ciao" });
  } catch (error) {
    console.log(error);
  }
});
export default app;
