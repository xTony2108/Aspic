const requiredEnvVars = [
  "MONGO_DB_URI",
  "RESEND_API_KEY",
  "MAIL_DEV_FROM",
  "MAIL_FROM",
  "MAIL_DEV_TO",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
] as const;

const missing = requiredEnvVars.filter((key) => !process.env[key]);

if (missing.length > 0) {
  throw new Error(
    `❌ Variabili d'ambiente mancanti: ${missing.join(", ")}\n` +
      "Controlla il tuo file .env",
  );
}

export const config = {
  SERVER_PORT: Number(process.env.SERVER_PORT || "3000"),
  ORIGIN: process.env.ORIGIN as string,
  ORIGIN_DEV: process.env.ORIGIN_DEV as string,
  MONGO_DB_URI: process.env.MONGO_DB_URI as string,
  RESEND_API_KEY: process.env.RESEND_API_KEY as string,
  MAIL_DEV_FROM: process.env.MAIL_DEV_FROM as string,
  MAIL_FROM: process.env.MAIL_FROM as string,
  MAIL_DEV_TO: process.env.MAIL_DEV_TO as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  NODE_ENV: (process.env.NODE_ENV || "development") as
    | "development"
    | "production",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET as string,
  BACKEND_URL: process.env.BACKEND_URL as string,
} as const;

export type Config = typeof config;
