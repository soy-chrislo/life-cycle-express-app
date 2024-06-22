import { z } from "zod";

export const authSchema = z
	.object({
		username: z.string().max(255),
		password: z.string().max(255),
	})
	.strict();

export const partialAuthSchema = authSchema.partial();

export type AuthSchema = z.infer<typeof authSchema>;
export type PartialAuthSchema = z.infer<typeof partialAuthSchema>;

export const validateTokenSchema = z
	.object({
		token: z.string().max(255),
	})
	.strict();

export type ValidateTokenSchema = z.infer<typeof validateTokenSchema>;
export type PartialValidateTokenSchema = z.infer<typeof validateTokenSchema>;
