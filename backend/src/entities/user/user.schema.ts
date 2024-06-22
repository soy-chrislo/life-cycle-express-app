import { z } from "zod";

export const userSchema = z
	.object({
		username: z.string().max(255),
		password: z.string().max(255),
		role: z.union([z.string().max(255), z.number()]).optional(),
	})
	.strict();

export const partialUserSchema = userSchema.partial();

export type UserSchema = z.infer<typeof userSchema>;
export type PartialUserSchema = z.infer<typeof partialUserSchema>;
