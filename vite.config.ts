/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { checker } from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		checker({
			eslint: process.env.VITEST
				? undefined
				: {
						lintCommand: "eslint . --ext .ts,.tsx --max-warnings=0",
				  },
			typescript: !process.env.VITEST,
		}),
	],
	server: {
		open: true,
		port: 3000,
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
		coverage: {
			reporter: ["text", "html"],
			exclude: ["node_modules/", "src/setupTests.ts"],
		},
	},
});
