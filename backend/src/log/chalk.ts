import chalk, { supportsColorStderr } from "chalk";
import { info, warn } from "./logger.js";
import { getDateComponents } from "../helper/date.js";

export const checkTerminalSupportsColor = () => {
	if (!supportsColorStderr) {
		warn("Terminal doesn't support color");
	} else {
		info("Terminal supports color");
	}
};

// LOGGER CONFIGURATION

export const colorizeLevel = (level: string): string => {
	switch (level) {
		case "error":
			return chalk.red(level.toUpperCase());
		case "warn":
			return chalk.yellow(level.toUpperCase());
		case "info":
			return chalk.blue(level.toUpperCase());
		case "debug":
			return chalk.green(level.toUpperCase());
		case "http":
			return chalk.magenta(level.toUpperCase());
		default:
			return level.toUpperCase();
	}
};

export const styleMessage = (level: string, message: string): string => {
	switch (level) {
		case "error":
			return chalk.bold(message);
		case "warn":
			return chalk.bold(message);
		case "info":
			return message;
		case "debug":
			return chalk.italic(message);
		case "http":
			return message;
		default:
			return message;
	}
};

export const formatDateForConsole = (date: Date): string => {
	const { day, month, year, hours, minutes, seconds, milliseconds, timezone } =
		getDateComponents(date);
	return `| ${chalk.bold(day)}-${chalk.bold(month)}-${chalk.bold(year)} | ${chalk.bold(hours)}:${chalk.bold(minutes)}:${chalk.bold(seconds)}:${chalk.bold(milliseconds)} (${timezone}) |`;
};

export const formatDateForFile = (date: Date): string => {
	const { day, month, year, hours, minutes, seconds, milliseconds, timezone } =
		getDateComponents(date);
	return `| ${day}-${month}-${year} | ${hours}:${minutes}:${seconds}:${milliseconds} (${timezone}) |`;
};
