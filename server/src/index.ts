import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import apiRoute from "./routes/index";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet({ crossOriginResourcePolicy: { policy: "same-origin" } }));
app.use(cors({ origin: "http://localhost:5173" }));

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`SERVER UP AND RUNNING ON PORT ${SERVER_PORT}`);
});

/**
 * @path /api
 */

app.use("/api", apiRoute);
