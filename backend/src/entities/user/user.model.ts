import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

	@Column({ type: "varchar", nullable: false, length: 255, name: "password" })
	password: string;

	constructor(user?: Partial<UserModel>) {
		if (user) {
			Object.assign(this, user);
		}
	}
}
