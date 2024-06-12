import * as express from "express";
import { userRouter } from "./user/index.js";
import { healthRouter } from "./health/index.js";
import { info } from "../log/logger.js";

export const mainRouter = express.Router();

(() => {
	mainRouter.use("/user", userRouter);
	info("User router loaded");
})();

(() => {
	mainRouter.use("/health", healthRouter);
	info("Health router loaded");
})();
