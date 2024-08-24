import type { Request, Response, NextFunction } from "express";
import { QueryParamError } from "../errors/QueryParamError.js";

export const checkQueryParams = (expectedParams: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const queryParams = Object.keys(req.query);

		for (const param of expectedParams) {
			if (!queryParams.includes(param)) {
				throw new QueryParamError(param, "missing");
			}
		}

		for (const param of queryParams) {
			if (!expectedParams.includes(param)) {
				throw new QueryParamError(param, "unexpected");
			}
		}
		next();
	};
};
