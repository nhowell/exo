import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { checker } from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		checker({
			eslint: {
				lintCommand: 'eslint . --ext .ts,.tsx --max-warnings=0"',
			},
			typescript: true,
		}),
	],
	server: {
		open: true,
		port: 3000,
	},
});
