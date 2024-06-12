import type { PartialUserDto, UserDto } from "./user.entity";
import { UserModel } from "./user.model.js";
import { executeQuery, getRepository } from "../../db/data-source.js";
import { http, info, warn } from "../../log/logger.js";

export const obtainUser = async (id: number) => {
	const userRepository = getRepository(UserModel);
	const user = await userRepository.findOneBy({ id });
	return user;
};

export const obtainAllUsers = async () => {
	const userRepository = getRepository(UserModel);
	const users = await userRepository.find();
	http(`Retrieved ${users.length} user(s)`);
	return users;
};

export const createUser = async (userDto: UserDto) => {
	const userRepository = getRepository(UserModel);
	const user = new UserModel(userDto);
	const userResult = await userRepository.save(user);
	http(`User created with id: ${userResult.id}`);
	return userResult;
};

export const updateUser = async (
	id: number,
	partialUserDto: PartialUserDto,
) => {
	const userRepository = getRepository(UserModel);
	const user = await obtainUser(id);
	if (!user) {
		warn(`User with id ${id} not found`);
		return null;
	}

	const updatedUser = userRepository.merge(user, partialUserDto);
	const userResult = await userRepository.save(updatedUser);
	http(`User updated with id: ${userResult.id}`);
	return userResult;
};

export const removeUser = async (id: number) => {
	const userRepository = getRepository(UserModel);
	const userResult = await userRepository.delete(id);
	http(`User deleted with id: ${id}`);
	return userResult;
};
