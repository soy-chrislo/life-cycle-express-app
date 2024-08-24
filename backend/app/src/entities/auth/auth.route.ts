import * as express from "express";
import { login, validateToken } from "./auth.controller.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { authSchema, validateTokenSchema } from "./auth.schema.js";

export const authRouter = express.Router();

authRouter.post("/login", validateSchema(authSchema), login);

authRouter.post(
	"/validate",
	validateSchema(validateTokenSchema),
	validateToken,
);
