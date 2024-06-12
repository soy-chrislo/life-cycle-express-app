import path from "node:path";
import { fileURLToPath } from "node:url";
import { info } from "../src/log/logger.js";
// import { config } from "dotenv";

const __filename = fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

if (!process.env.NODE_ENV) {
	throw new Error("Environment variable NODE_ENV is missing");
}

// config({
// 	path: path.join(__dirname, `${process.env.NODE_ENV}.env`),
// });

interface Env {
	NODE_ENV: string;
	PORT: number;
	DB_HOST: string;
	DB_PORT: number;
	DB_NAME: string;
	DB_USER: string;
	DB_PASSWORD: string;
	DEBUG: boolean;
}

const envVariables = [
	"DB_PORT",
	"DB_NAME",
	"DB_USER",
	"DB_PASSWORD",
	"PORT",
	"NODE_ENV",
	"DB_HOST",
	"DEBUG",
];

for (const variable of envVariables) {
	if (!process.env[variable]) {
		throw new Error(`Environment variable ${variable} is missing`);
	}
}

export const env: Env = {
	NODE_ENV: process.env.NODE_ENV || "",
	DB_HOST: process.env.DB_HOST || "",
	PORT: Number(process.env.PORT) || 3000,
	DB_PORT: Number(process.env.DB_PORT) || 1000,
	DB_NAME: process.env.DB_NAME || "",
	DB_USER: process.env.DB_USER || "",
	DB_PASSWORD: process.env.DB_PASSWORD || "",
	DEBUG: process.env.DEBUG === "true",
};

export const envLogger = () => {
	const envKeys = Object.keys(env);
	const envValues = Object.values(env);

	const envStrings = envKeys.map((key, index) => `${key}: ${envValues[index]}`);
	const envOutput = envStrings.join("\n\t");

	info(`Environment variables:\n\t${envOutput}`);
};
