import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/

// vite.config.ts
function preloadLogoPlugin(): Plugin {
  return {
    name: "preload-logo",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const logo = Object.values(ctx.bundle ?? {}).find((chunk) =>
          chunk.fileName.includes("logo_aspic"),
        );

        if (!logo) return html;

        return html.replace(
          "</head>",
          `<link rel="preload" href="/${logo.fileName}" as="image" type="image/svg+xml">\n</head>`,
        );
      },
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    preloadLogoPlugin(),
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
