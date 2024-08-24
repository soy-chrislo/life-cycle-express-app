import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../index.js";

describe("Health", () => {
	it("should return 200", async () => {
		const response = await request(app).get("/health");
		expect(response.status).toBe(200);
	});
});
