import type { Request, Response } from "express";
import { ErrorMessage } from "../../errors/ErrorMessage.js";

export const getHealth = async (req: Request, res: Response) => {
	const healthCheck = {
		uptime: process.uptime(),
		message: "OK",
		timestamp: Date.now(),
	};

	try {
		return res.json(healthCheck);
	} catch (error) {
		if (error instanceof ErrorMessage) {
			return res.status(400).json({ message: error.message });
		}
	}
};
