import type { NextFunction, Request, Response } from "express";
import type { EmptyObject } from "../../types";
import type { AuthSchema, ValidateTokenSchema } from "./auth.schema";
import { getRepository } from "../../db/data-source.js";
import { UserModel } from "../user/user.model.js";
import { comparePassword } from "../../helper/encrypt.js";
import { generateJWT, verifyJWT } from "../../helper/auth.js";

export const login = async (
	req: Request<EmptyObject, EmptyObject, AuthSchema>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { username, password } = req.body;

		const userRepository = getRepository(UserModel);
		const user = await userRepository.findOne({
			where: { username },
			relations: ["password"],
		});

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const isPasswordValid = await comparePassword(
			password,
			user.password.password,
		);

		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = generateJWT({ username, id: user.id });
		return res.json({ id: user.id, username, token });
	} catch (error) {
		next(error);
	}
};

export const validateToken = async (
	req: Request<EmptyObject, EmptyObject, ValidateTokenSchema>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { token } = req.body;
		const decoded = verifyJWT(token);
		return res.json(decoded);
	} catch (error) {
		next(error);
	}
};
