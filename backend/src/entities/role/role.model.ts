import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserModel } from "../user/user.model.js";

@Entity({ name: "Role" })
export class RoleModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		unique: true,
		nullable: false,
		length: 255,
		name: "name",
	})
	name: string;

	@OneToMany(
		() => UserModel,
		(user) => user.role,
	)
	users: UserModel[];

	constructor(role?: Partial<RoleModel>) {
		if (role) {
			Object.assign(this, role);
		}
	}
}
