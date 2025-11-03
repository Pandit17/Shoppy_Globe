import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration for React project
 * - Uses official React plugin for Vite
 * - Sets base path for GitHub Pages deployment
 */
export default defineConfig({
  plugins: [
    react(), // Enables React support in Vite (JSX, fast refresh, etc.)
  ],
  
  // Base URL for GitHub Pages
  base: '/Shoppy_Globe/',
});
