import type { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../helper/auth.js";
import { info } from "../log/logger.js";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		verifyJWT(token);

		next();
	} catch (error) {
		next(error);
	}
};
