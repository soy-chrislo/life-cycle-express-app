import { DataSource, type ObjectLiteral, type EntityTarget } from "typeorm";
import { UserModel } from "../entities/user/index.js";
import { env } from "../../env/env.js";
import { info } from "../log/logger.js";
import { RoleModel } from "../entities/role/role.model.js";
import { PasswordModel } from "../entities/passwod/password.model.js";

const AppDataSource = new DataSource({
	type: "postgres",
	host: env.DB_HOST,
	port: env.DB_PORT,
	username: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_NAME,
	synchronize: true,
	logging: false,
	entities: [UserModel, RoleModel, PasswordModel],
	subscribers: [],
	migrations: [],
});

export const initializeDataSource = async () => {
	try {
		await AppDataSource.initialize();
		info("Data source initialized");
	} catch (error) {
		console.error(error);
	}
};

export const getRepository = <T extends ObjectLiteral>(
	entity: EntityTarget<T>,
) => {
	if (!AppDataSource.isInitialized) {
		throw new Error("Data source is not initialized");
	}
	return AppDataSource.getRepository(entity);
};

export const executeQuery = async (
	query: string,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	parameters?: any[],
) => {
	if (!AppDataSource.isInitialized) {
		throw new Error("Data source is not initialized");
	}
	return AppDataSource.query(query, parameters);
};
