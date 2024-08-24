import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	BeforeInsert,
	BeforeUpdate,
} from "typeorm";
import type { UserModel } from "../user/user.model.js";
import { hashPassword } from "../../helper/encrypt.js";

@Entity({ name: "Password" })
export class PasswordModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		nullable: false,
		length: 255,
		name: "password",
	})
	password: string;

	@OneToOne("UserModel", (user: UserModel) => user.password)
	user: UserModel;

	constructor(password?: Partial<PasswordModel>) {
		if (password) {
			Object.assign(this, password);
		}
	}

	@BeforeInsert()
	@BeforeUpdate()
	async hashUserPassword() {
		if (this.password) {
			// const salt = await bcrypt.genSalt(10);
			// this.password = await bcrypt.hash(this.password, salt);
			this.password = await hashPassword(this.password);
		}
	}
}
