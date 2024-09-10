import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
    port: 3000,
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportAsDefault: true,
        // svgr options
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
