import "reflect-metadata";
import express from "express";
import type { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger.js";

import "./db/data-source.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { initializeDataSource } from "./db/data-source.js";
import { mainRouter } from "./entities/routes.js";
import { env, envLogger } from "../env/env.js";
import { info } from "./log/logger.js";
import { checkTerminalSupportsColor } from "./log/chalk.js";
import { morganMiddleware } from "./log/morgan.js";

checkTerminalSupportsColor();
if (env.NODE_ENV === "development") {
	envLogger();
}

const app = express();
const port = env.PORT;

(() => {
	app.use(morganMiddleware);
	info(`Setup morgan with ${env.NODE_ENV} environment`);
})();

app.use(express.json());

await initializeDataSource();

if (env.NODE_ENV === "development") {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
}

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Hello World" });
});

app.use(mainRouter);

app.use(errorHandler);

app.listen(port, () => {
	info(`Server is running on http://localhost:${port}`);
});

export default app;
