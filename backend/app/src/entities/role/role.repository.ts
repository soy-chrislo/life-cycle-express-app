import { getRepository } from "../../db/data-source.js";
import { http } from "../../log/logger.js";
import type { PartialRoleDto, RoleDto } from "./role.entity";
import { RoleModel } from "./role.model.js";

export const obtainRole = async (id: number) => {
	const roleRepository = getRepository(RoleModel);
	const role = await roleRepository.findOneBy({ id });
	http(`Retrieved role with id: ${id}`);
	return role;
};

export const obtainAllRoles = async () => {
	const roleRepository = getRepository(RoleModel);
	const roles = await roleRepository.find();
	http(`Retrieved ${roles.length} role(s)`);
	return roles;
};

export const createRole = async (roleDto: RoleDto) => {
	const roleRepository = getRepository(RoleModel);
	const role = new RoleModel(roleDto);
	const roleResult = await roleRepository.save(role);
	http(`Role created with id: ${roleResult.id}`);
	return roleResult;
};

export const updateRole = async (
	id: number,
	partialRoleDto: PartialRoleDto,
) => {
	const role = await obtainRole(id);
	if (!role) {
		http(`Role with id ${id} not found`);
		return null;
	}

	const roleRepository = getRepository(RoleModel);
	const updatedRole = roleRepository.merge(role, partialRoleDto);
	const roleResult = await roleRepository.save(updatedRole);
	http(`Role updated with id: ${roleResult.id}`);
	return roleResult;
};

export const removeRole = async (id: number) => {
	const roleRepository = getRepository(RoleModel);
	const roleResult = await roleRepository.delete(id);
	http(`Role deleted with id: ${id}`);
	return roleResult;
};
