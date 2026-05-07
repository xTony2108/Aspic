import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/

// vite.config.ts

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
  build: {
    minify: true,
    cssMinify: true,
  },
  server: {
    proxy: {
      "/api": "http://localhost:3030",
    },
  },
});
