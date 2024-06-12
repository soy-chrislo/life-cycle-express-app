import type { OAS3Options, OAS3Definition } from "swagger-jsdoc";
import swaggerJsdoc from "swagger-jsdoc";
import { env } from "../../env/env.js";

const swaggerDefinition: OAS3Definition = {
	openapi: "3.0.1",
	info: {
		title: "Login API",
		version: "1.0.0",
	},
	servers: [
		{
			url: "http://localhost:3000",
			description: "Development server",
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
			},
		},
		schemas: {
			user: {
				type: "object",
				properties: {
					id: {
						type: "integer",
					},
					username: {
						type: "string",
					},
					password: {
						type: "string",
					},
				},
			},
			userDto: {
				type: "object",
				properties: {
					username: {
						type: "string",
					},
					password: {
						type: "string",
					},
				},
			},
		},
	},
};

const swaggerOptions: OAS3Options = {
	swaggerDefinition,
	apis:
		env.NODE_ENV === "development"
			? ["src/entities/**/*.ts"]
			: ["/home/node/app/dist/src/entities/**/*.js"],
};

export default swaggerJsdoc(swaggerOptions);
