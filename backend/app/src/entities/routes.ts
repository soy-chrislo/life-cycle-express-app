import * as express from "express";
import { userRouter } from "./user/index.js";
import { healthRouter } from "./health/index.js";
import { info } from "../log/logger.js";
import rateLimit, { type Options } from "express-rate-limit";
import { roleRouter } from "./role/role.route.js";
import { authRouter } from "./auth/auth.route.js";

export const mainRouter = express.Router();

const customHandler = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
	options: Options,
) => {
	res.status(options.statusCode).json({
		status: "error",
		message: "Too many requests, please try again later.",
	});
};

const endpointLimiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 200,
	handler: customHandler,
});
(() => {
	mainRouter.use("/user", endpointLimiter, userRouter);
	info("User router loaded");
})();

(() => {
	mainRouter.use("/health", endpointLimiter, healthRouter);
	info("Health router loaded");
})();

(() => {
	mainRouter.use("/role", endpointLimiter, roleRouter);
	info("Role router loaded");
})();

(() => {
	mainRouter.use("/auth", authRouter);
	info("Auth router loaded");
})();
