import type { NextFunction, Request, Response } from "express";
import type { PartialUserSchema, UserSchema } from "./user.schema";
import type { EmptyObject } from "../../types";
import type { PartialUserDto, UserDto } from "./user.entity";
import {
	createUser,
	obtainAllUsers,
	obtainUser,
	removeUser,
	updateUser,
} from "./user.repository.js";

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.query.id) {
			const users = await obtainAllUsers();
			return res.json(users);
		}
		const { id } = req.query;
		const user = await obtainUser(Number(id));
		return res.json(user || {});
	} catch (error) {
		next(error);
	}
};

export const postUser = async (
	req: Request<EmptyObject, EmptyObject, UserSchema>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userDto: UserDto = { ...req.body };

		const user = await createUser(userDto);
		return res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

export const patchUser = async (
	req: Request<EmptyObject, EmptyObject, PartialUserSchema>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.query;
		const possibleUser = await obtainUser(Number(id));
		if (!possibleUser) {
			return res.status(404).json({ message: "User not found" });
		}
		const userDto: PartialUserDto = { ...req.body };
		const user = await updateUser(Number(id), userDto);
		return res.json(user);
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.query;
		const possibleUser = await obtainUser(Number(id));
		if (!possibleUser) {
			return res.status(404).json({ message: "User not found" });
		}
		const result = await removeUser(Number(id));
		if (result.affected) {
			return res.json({ message: `User with id ${id} removed` });
		}
		return res.json({ message: "Something went wrong" });
	} catch (error) {
		next(error);
	}
};

// -----------------------
// #### Relation ROLE ####
// -----------------------
