import { createLogger, format, transports } from "winston";
import chalk from "chalk";
import DailyRotateFile from "winston-daily-rotate-file";
import {
	colorizeLevel,
	formatDateForConsole,
	formatDateForFile,
	styleMessage,
} from "./chalk.js";

const logLevel = process.env.DEBUG ? "debug" : "http";

const customLevels = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		debug: 4,
	},
	colors: {
		error: "red",
		warn: "yellow",
		info: "blue",
		http: "magenta",
		debug: "green",
	},
};

const consoleFormat = format.combine(
	format.timestamp(),
	format.printf(({ timestamp, level, message }) => {
		const formattedDate = formatDateForConsole(new Date(timestamp));
		if (level === "error") {
			const highlighted = chalk.bgRed(
				`${formattedDate} [${colorizeLevel(level)}]`,
			);
			return `${highlighted}: ${styleMessage(level, message)}`;
		}
		// if (level === "http") {
		// 	const highlighted = chalk.bgWhite(
		// 		`${formattedDate} [${colorizeLevel(level)}]`,
		// 	);
		// 	return `${highlighted}: ${styleMessage(level, message)}`;
		// }
		return `${formattedDate} [${colorizeLevel(level)}]: ${styleMessage(
			level,
			message,
		)}`;
	}),
);

const fileFormat = format.combine(
	format.timestamp(),
	format.printf(({ timestamp, level, message }) => {
		const formattedDate = formatDateForFile(new Date(timestamp));
		return `${formattedDate} [${level.toUpperCase()}]: ${message}`;
	}),
);

const consoleTransport = new transports.Console({
	format: consoleFormat,
});

const dailyRotateFileTransport = new DailyRotateFile({
	filename: "logs/application-%DATE%.log",
	datePattern: "DD-MM-YYYY",
	zippedArchive: true,
	maxSize: "20m",
	maxFiles: "14d",
	format: fileFormat,
});

const logger = createLogger({
	levels: customLevels.levels,
	level: logLevel,
	format: format.timestamp(),
	transports: [consoleTransport, dailyRotateFileTransport],
});

export default logger;
