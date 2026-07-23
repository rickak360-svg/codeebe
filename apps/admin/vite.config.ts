import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  envDir: __dirname,
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "8080"),
    allowedHosts: ["codeebeadmin-dev.up.railway.app", "localhost"],
    middlewareMode: false,
  },
  preview: {
    host: true,
    port: parseInt(process.env.PORT || "4173"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

