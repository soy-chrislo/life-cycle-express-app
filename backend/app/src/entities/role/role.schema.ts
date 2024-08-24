import { z } from "zod";

export const roleSchema = z
	.object({
		name: z.string().max(255),
	})
	.strict();

export const partialRoleSchema = roleSchema.partial();

export type RoleSchema = z.infer<typeof roleSchema>;
export type PartialRoleSchema = z.infer<typeof partialRoleSchema>;
