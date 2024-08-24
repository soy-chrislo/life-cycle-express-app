export class UserEntity {
	id: number | undefined;
	username: string;
	password: string;
	role?: {
		id: number;
		name: string;
	};

	constructor(
		id: number,
		username: string,
		password: string,
		role?: { id: number; name: string },
	) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
	}
}

export type UserDto = Omit<UserEntity, "id" | "role"> & {
	role?: undefined | number | string;
};
export type PartialUserDto = Partial<UserDto>;
