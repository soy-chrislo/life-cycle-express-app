import express from "express";
import { deleteRole, getRole, patchRole, postRole } from "./role.controller.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { partialRoleSchema, roleSchema } from "./role.schema.js";
import { checkQueryParams } from "../../middleware/checkQueryParams.js";

export const roleRouter = express.Router();

roleRouter.get("/", getRole);
roleRouter.post("/", validateSchema(roleSchema), postRole);
roleRouter.patch(
	"/",
	checkQueryParams(["id"]),
	validateSchema(partialRoleSchema),
	patchRole,
);
roleRouter.delete("/", checkQueryParams(["id"]), deleteRole);
