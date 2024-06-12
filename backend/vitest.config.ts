import path from "node:path";
import { loadEnvFile } from "node:process";
import { defineConfig } from "vitest/config";

const appDir = process.cwd();
loadEnvFile(path.join(appDir, "env", "development.env"));

export default defineConfig({
	test: {
		globals: true,
		coverage: {
			reporter: ["text", "html"],
		},
	},
});
