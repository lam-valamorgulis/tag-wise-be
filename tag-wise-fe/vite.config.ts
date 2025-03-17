import react from "@vitejs/plugin-react";
import fs from "fs";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("localhost-key.pem"),
      cert: fs.readFileSync("localhost-cert.pem"),
    },
    host: "0.0.0.0", // Allows access from external networks
    port: 3000, // Use the same port
    strictPort: true,
  },
});
