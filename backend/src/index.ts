import "reflect-metadata";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger.js";
import cors from "cors";

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = env.PORT;

(() => {
	// res.set('Access-Control-Allow-Origin', 'http://localhost:4321');
	const corsOptions = {
		origin: ["http://localhost:4321", "http://localhost:5173"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	};
	app.use(cors(corsOptions));

	app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
		if (!(err instanceof Error)) return;
		if (err && err.name === "CorsError") {
			res.status(403).json({ message: "Access denied by CORS policy" });
		} else {
			next();
		}
	});
})();

(() => {
	app.use(morganMiddleware);
	info(`Setup morgan with ${env.NODE_ENV} environment`);
})();

await initializeDataSource();

if (env.NODE_ENV === "development") {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
}

app.use(mainRouter);

app.use(errorHandler);

app.listen(port, () => {
	info(`Server is running on http://localhost:${port}`);
});

export default app;
