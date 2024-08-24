import jwt from "jsonwebtoken";
import { env } from "../env/env.js";

export const generateJWT = (user: { id: number; username: string }) => {
	const { id, username } = user;
	return jwt.sign({ id, username }, env.jwtSecret, {
		expiresIn: "1h",
	});
};

export const verifyJWT = (token: string) => {
	return jwt.verify(token, env.jwtSecret);
};
