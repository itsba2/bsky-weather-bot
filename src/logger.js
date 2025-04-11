const winston = require("winston");
const path = require("path");
const fs = require("fs");
const config = require("./config");

if (!fs.existsSync(config.paths.logs)) {
  fs.mkdirSync(config.paths.logs, { recursive: true });
}

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    ({ level, message, timestamp }) =>
      `${timestamp} [${level.toUpperCase()}]: ${message}`
  )
);

const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(config.paths.logs, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(config.paths.logs, "access.log"),
      level: "http",
    }),
  ],
});

module.exports = logger;
