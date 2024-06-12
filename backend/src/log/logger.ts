import logger from "./winston.js";

const error = (message: string): void => {
	logger.log("error", message);
};

const debug = (message: string): void => {
	logger.log("debug", message);
};

const info = (message: string): void => {
	logger.log("info", message);
};

const warn = (message: string): void => {
	logger.log("warn", message);
};

const http = (message: string): void => {
	logger.log("http", message);
};

export { error, debug, info, warn, http };
