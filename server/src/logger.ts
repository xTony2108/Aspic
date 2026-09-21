import pino from "pino";
import morgan from "morgan";
import { config } from "./config.js";
import { pinoHttp } from "pino-http";

const redactUrl = (url?: string) => {
  if (!url) return "unknown";

  try {
    const parsed = new URL(url, "http://localhost");

    for (const key of ["token", "session_id"]) {
      if (parsed.searchParams.has(key)) {
        parsed.searchParams.set(key, "[REDACTED]");
      }
    }

    return `${parsed.pathname}${parsed.search}`;
  } catch {
    return url.split("?")[0] || "unknown";
  }
};

const logger = pino({
  level: config.NODE_ENV === "production" ? "info" : "debug",
  transport: {
    targets: [
      // File con rotazione automatica
      {
        target: "pino-rotating-file-stream",
        options: {
          filename: `./app-${new Date().toISOString().split("T")[0]}.log`,
          path: "./logs",
          size: "10M",
          rotate: 7,
          interval: "1d",
          compress: "gzip",
        },
        level: "info",
      },
      // Console per development
      ...(config.NODE_ENV === "development"
        ? [
            {
              target: "pino-pretty",
              options: {
                colorize: true,
                translateTime: "SYS:standard",
                ignore: "pid,hostname",
              },
            },
          ]
        : [
            // Console anche in production (senza colori)
            {
              target: "pino-pretty",
              options: {
                colorize: false,
                translateTime: "SYS:standard",
                ignore: "pid,hostname",
              },
              level: "info",
            },
          ]),
    ],
  },
});

// Logger HTTP con Pino
export const httpLogger = pinoHttp({
  logger,
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    }
    return "info";
  },
  customSuccessMessage: (req, res) => {
    return `${req.method} ${redactUrl(req.url)} - ${res.statusCode}`;
  },
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${redactUrl(req.url)} - ${res.statusCode} - ${err?.message || "Unknown error"}`;
  },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: redactUrl(req.url),
      headers: {
        "user-agent": req.headers["user-agent"],
        "content-type": req.headers["content-type"],
      },
    }),
    res: (res) => ({
      statusCode: res.statusCode,
      headers: {
        "content-type": res.headers["content-type"],
        "content-length": res.headers["content-length"],
      },
    }),
  },
});

// Morgan middleware per logging HTTP requests (formato Apache)
export const morganMiddleware = morgan(
  (tokens, req, res) => {
    return [
      tokens.method(req, res),
      redactUrl(tokens.url(req, res)),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  },
  {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
    skip: (req, res) => {
      // Salta logging per health checks o risorse statiche
      return (
        req.url === "/health" ||
        Boolean(req.url && req.url.startsWith("/favicon"))
      );
    },
  },
);

// Esporta il logger principale per uso manuale
export { logger };
