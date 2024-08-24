import express from "express";
import { deleteUser, getUser, patchUser, postUser } from "./user.controller.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { partialUserSchema, userSchema } from "./user.schema.js";
import { checkQueryParams } from "../../middleware/checkQueryParams.js";
import { authMiddleware } from "../../middleware/protectedRoute.js";

export const userRouter = express.Router();

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Get all users or a specific user by id
 *     description: Get all users or a specific user by id
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: The id of the user to retrieve
 *         required: false
 *     responses:
 *       200:
 *         description: A list of users or a specific user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/user"
 *       404:
 *         description: No users or user found
 */
userRouter.get("/", authMiddleware, getUser);

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint creates a new user with the provided information in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userDto'
 *     responses:
 *       201:
 *         description: The user was successfully created. The response body contains the created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: The request was invalid. The response body contains an error message.
 *       500:
 *         description: There was an error processing the request. The response body contains an error message.
 */
userRouter.post("/", validateSchema(userSchema), postUser);

/**
 * @openapi
 * /user:
 *   patch:
 *     summary: Update an existing user
 *     description: This endpoint updates an existing user with the provided information in the request body. Remove any properties that you do not want to update.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: The id of the user to update
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userDto'
 *     responses:
 *       200:
 *         description: The user was successfully updated. The response body contains the updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       404:
 *         description: The user was not found. The response body contains an error message.
 *       400:
 *         description: The request was invalid. The response body contains an error message.
 *       500:
 *         description: There was an error processing the request. The response body contains an error message.
 */
userRouter.patch(
	"/",
	checkQueryParams(["id"]),
	validateSchema(partialUserSchema),
	patchUser,
);

/**
 * @openapi
 * /user:
 *   delete:
 *     summary: Delete an existing user
 *     description: This endpoint deletes an existing user with the provided id in the query parameter.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: The id of the user to delete
 *         required: true
 *     responses:
 *       200:
 *         description: The user was successfully deleted. The response body contains a success message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: The user was not found. The response body contains an error message.
 *       500:
 *         description: There was an error processing the request. The response body contains an error message.
 */
userRouter.delete("/", checkQueryParams(["id"]), deleteUser);
