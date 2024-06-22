import type { NextFunction, Request, Response } from "express";
import {
	createRole,
	obtainAllRoles,
	obtainRole,
	removeRole,
	updateRole,
} from "./role.repository.js";
import type { EmptyObject } from "../../types/index";
import type { RoleSchema } from "./role.schema";
import type { PartialRoleDto } from "./role.entity";

export const getRole = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.query.id) {
			const roles = await obtainAllRoles();
			return res.json(roles);
		}
		const { id } = req.query;
		const role = await obtainRole(Number(id));
		return res.json(role || {});
	} catch (error) {
		next(error);
	}
};

export const postRole = async (
	req: Request<EmptyObject, EmptyObject, RoleSchema>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const roleDto = { ...req.body };
		const role = await createRole(roleDto);
		return res.status(201).json(role);
	} catch (error) {
		next(error);
	}
};

export const patchRole = async (
	req: Request<EmptyObject, EmptyObject, RoleSchema>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.query;
		const possibleRole = await obtainRole(Number(id));
		if (!possibleRole) {
			return res.status(404).json({ message: "Role not found" });
		}
		const roleDto: PartialRoleDto = { ...req.body };
		const role = await updateRole(Number(id), roleDto);
		return res.json(role);
	} catch (error) {
		next(error);
	}
};

export const deleteRole = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.query;
		const possibleRole = await obtainRole(Number(id));
		if (!possibleRole) {
			return res.status(404).json({ message: "Role not found" });
		}
		const result = await removeRole(Number(id));
		if (result.affected) {
			return res.json({ message: `Role with id ${id} deleted` });
		}
		return res.status(404).json({ message: "Something went wrong" });
	} catch (error) {
		next(error);
	}
};
