export class RoleEntity {
	id: number | undefined;
	name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}

export type RoleDto = Omit<RoleEntity, "id">;
export type PartialRoleDto = Partial<RoleDto>;
