import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { RoleModel } from "../role/role.model.js";
import { PasswordModel } from "../passwod/password.model.js";

@Entity({ name: "User" })
export class UserModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		unique: true,
		nullable: false,
		length: 255,
		name: "username",
	})
	username: string;

	// @Column({ type: "varchar", nullable: false, length: 255, name: "password" })
	// password: string;

	@OneToOne(
		() => PasswordModel,
		(password) => password.user,
		{ cascade: true, nullable: false },
	)
	@JoinColumn({ name: "password_id" })
	password: PasswordModel;

	@ManyToOne(
		() => RoleModel,
		(role) => role.users,
		{ nullable: true },
	)
	@JoinColumn({ name: "role_id" })
	role: RoleModel | null;

	constructor(user?: Partial<UserModel>) {
		if (user) {
			Object.assign(this, user);
		}
	}
}
