import type { PartialUserDto, UserDto } from "./user.entity";
import { UserModel } from "./user.model.js";
import { getRepository } from "../../db/data-source.js";
import { error, http, warn } from "../../log/logger.js";
import { RoleModel } from "../role/role.model.js";
import { PasswordModel } from "../passwod/password.model.js";

export const obtainUser = async (id: number) => {
	const userRepository = getRepository(UserModel);
	const user = await userRepository.findOneBy({ id });
	http(`Retrieved user with id: ${id}`);
	return user;
};

export const obtainAllUsers = async () => {
	const userRepository = getRepository(UserModel);
	const users = await userRepository.find({ relations: ["role", "password"] });
	http(`Retrieved ${users.length} user(s)`);
	return users;
};

const findRole = async (idOrName: number | string | undefined) => {
	const roleRepository = getRepository(RoleModel);
	if (!idOrName) return null;

	if (typeof idOrName === "number") {
		const id = idOrName;
		return await roleRepository.findOneBy({ id });
	}
	if (typeof idOrName === "string") {
		const name = idOrName;
		return await roleRepository.findOne({ where: { name } });
	}

	return null;
};

export const createUser = async (userDto: UserDto) => {
	const role = await findRole(userDto.role);
	if (!role) {
		warn("Creating user without role");
	}

	const userRepository = getRepository(UserModel);
	const passwordRepository = getRepository(PasswordModel);

	const password = new PasswordModel({ password: userDto.password });

	const user = new UserModel({ ...userDto, role, password });
	const userResult = await userRepository.save(user);
	http(`User created with id: ${userResult.id}`);
	return userResult;
};

export const updateUser = async (
	id: number,
	partialUserDto: PartialUserDto,
) => {
	const role = await findRole(partialUserDto.role);
	if (!role) {
		error("Role not found");
		return null;
	}

	const userRepository = getRepository(UserModel);
	const passwordRepository = getRepository(PasswordModel);

	const user = await userRepository.findOne({
		where: { id },
		relations: ["password"],
	});
	if (!user) {
		warn(`User not found with id: ${id}`);
		return null;
	}

	if (partialUserDto.password) {
		if (user.password) {
			user.password.password = partialUserDto.password;
			await passwordRepository.save(user.password);
		} else {
			const newPasswod = new PasswordModel({
				password: partialUserDto.password,
			});
			await passwordRepository.save(newPasswod);
			user.password = newPasswod;
		}
	}
	const userResult = await userRepository.save(user);
	http(`User updated with id: ${id}`);
	return userResult;
};

export const removeUser = async (id: number) => {
	const userRepository = getRepository(UserModel);
	const userResult = await userRepository.delete(id);
	http(`User deleted with id: ${id}`);
	return userResult;
};
