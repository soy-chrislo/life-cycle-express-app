import type { Request, Response, NextFunction } from "express";
import type { EmptyObject } from "../types";
import { QueryFailedError } from "typeorm";
import { PostgresError } from "pg-error-enum";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { QueryParamError } from "../errors/QueryParamError.js";

interface ErrorResponse {
	status: number;
	message: string;
}

export const errorHandler = (
	err: EmptyObject,
	req: Request,
	res: Response<ErrorResponse>,
	next: NextFunction,
) => {
	if (err instanceof QueryFailedError) {
		// "23505"
		if (err.code === PostgresError.UNIQUE_VIOLATION) {
			console.error(err.detail, err.query);
			return res.status(400).json({
				status: 400,
				message: `DETAIL: ${err.detail} - QUERY: ${err.query}`,
			});
		}
		return res
			.status(400)
			.json({ status: 400, message: err.driverError?.message });
	}
	if (err instanceof ZodError) {
		const formError = fromError(err).toString();
		console.error(`ZodError: ${formError}`);
		return res.status(400).json({ status: 400, message: formError });
	}
	if (err instanceof QueryParamError) {
		console.error(err.message);
		return res.status(400).json({ status: 400, message: err.message });
	}

	console.error(err.message);
	res.status(500).json({
		status: 500,
		message: "Internal Server Error",
	});
};
