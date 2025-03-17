import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
/** @type {import('tailwindcss').Config} */

export default defineConfig({
  base: "/",
  plugins: [react()],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true, // Generates source maps for debugging
    minify: "terser", // Uses terser for better minification
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Separate vendor chunks
        },
      },
    },
  },
  plugins: [],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Enable @ imports from src directory
    },
  },
});
