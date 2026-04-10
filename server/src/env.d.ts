declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT?: string;
      MONGO_DB_URI: string;
      RESEND_API_KEY: string;
      MAIL_DEV_FROM: string;
      MAIL_FROM: string;
      MAIL_DEV_TO: string;
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
      NODE_ENV?: "development" | "production";
    }
  }
}

export {};
