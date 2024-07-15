import { defineConfig } from "vite";

const HOST = process.env.MONACA_SERVER_HOST || "0.0.0.0";

export default defineConfig({
	server: {
		host: HOST,
		port: 8080,
	},
});
