export const logger = window.api.logger ?? console;

if (window.api.logger) {
  console.debug = logger.debug;
  console.info = logger.info;
  console.warn = logger.warn;
  console.error = logger.error;
  console.log = logger.info;
}
export default logger;
