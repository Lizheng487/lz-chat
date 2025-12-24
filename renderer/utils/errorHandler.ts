import type { Plugin } from "vue";
import logger from "./logger";

export const errorHandler: Plugin = function (app) {
  app.config.errorHandler = (err, instance, info) => {
    logger.error("vue error", err, instance, info);
  };
  window.onerror = (message, source, lineno, colno, error) => {
    logger.error("window error", message, source, lineno, colno, error);
  };
  window.onunhandledrejection = (event) => {
    logger.error("unhandled Promise Rejection", event);
  };
};
export default errorHandler;
