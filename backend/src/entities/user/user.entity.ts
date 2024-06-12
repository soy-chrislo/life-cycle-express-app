export class UserEntity {
	id: number | undefined;
	username: string;
	password: string;

	constructor(id: number, username: string, password: string) {
		this.id = id;
		this.username = username;
		this.password = password;
	}
}

export type UserDto = Omit<UserEntity, "id">;
export type PartialUserDto = Partial<UserDto>;
