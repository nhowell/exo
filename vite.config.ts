/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
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
		tsconfigPaths(),
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
			provider: "v8",
			reporter: ["text", "html"],
			exclude: ["node_modules/", "src/setupTests.ts"],
		},
	},
});
