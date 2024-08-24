import type { UserSchema } from "../entities/user/user.schema";

declare module "express-serve-static-core" {
	interface Request {
		body: UserSchema;
	}
}
