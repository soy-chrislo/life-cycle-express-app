import type { StreamOptions } from "morgan";
import { http } from "./logger.js";
import morgan from "morgan";
import type { Request, Response } from "express";
import chalk from "chalk";

const stream: StreamOptions = {
	write: (message) => http(message.trim()),
};

export const morganMiddleware = morgan(
	(tokens, req: Request, res: Response) => {
		const requestContentLength = req.headers["content-length"] || "N/A";
		const responseContentLength = res.getHeader("content-length") || "N/A";

		return `${chalk.bold(tokens.method(req, res))} ${tokens.url(req, res)} ${chalk.bold(tokens.status(req, res))} - ${tokens["response-time"](req, res)} ms - ${tokens["user-agent"](req, res)} [${requestContentLength}:${responseContentLength}]`;
	},
	{ stream },
);
