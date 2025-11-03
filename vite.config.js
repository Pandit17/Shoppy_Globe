// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite configuration for Shoppy_Globe (React + Vite)
 *
 * ▶ Enables React plugin for JSX transformation and fast refresh
 * ▶ Sets base path for GitHub Pages deployment
 * ▶ Ensures correct asset loading when hosted at:
 *    https://Pandit17.github.io/Shoppy_Globe/
 */
export default defineConfig({
  plugins: [
    react(), // Integrates React with Vite build system
  ],

  // Base path must match repository name for GitHub Pages
  base: "/Shoppy_Globe/",
});
