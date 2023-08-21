import winston, { createLogger, format, transports } from "winston";
const { combine, timestamp, json } = format;

export default function getLogger() {
  return createLogger({
    level: "info",
    format: combine(timestamp(), json()),
    transports: [new transports.Console()],
  });
}
