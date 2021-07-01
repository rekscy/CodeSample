import { createLogger, format, transports } from "winston";
const config: any = null; //simulated

const { combine } = format;
const LoggerLevel = {
  error: "error",
  warn: "warn",
  info: "info",
  verbose: "verbose",
  debug: "debug",
  silly: "silly"
};
const PROD_LOG_LEVEL = LoggerLevel.verbose;
const DEV_LOG_LEVEL = LoggerLevel.verbose;

const RexLogger = createLogger({
  format: combine(
    format.colorize(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.splat(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: config.isDevModeEnabled ? DEV_LOG_LEVEL : PROD_LOG_LEVEL
    })
  ]
});

if (config.isDevModeEnabled) {
  RexLogger.info("Application initialized in development mode");
} else {
  RexLogger.info("Application initialized in production mode");
}
export default RexLogger;
