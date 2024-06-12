import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import type { EmptyObject } from "../types";

export const validateSchema = <T>(schema: ZodSchema<T>) => {
	return (
		req: Request<EmptyObject, EmptyObject, T>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const validateBody = schema.parse(req.body);
			req.body = validateBody;
			next();
		} catch (error) {
			next(error);
		}
	};
};
