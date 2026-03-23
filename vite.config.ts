import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// base: "/" по умолчанию; для деплоя в подпапку CDN задайте, например, base: "/m3-article/"
// public готовится скриптом prepare-public (копия без проблемного корневого wood-materials.jpg)
export default defineConfig({
  publicDir: path.resolve(__dirname, ".public-filtered"),
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: false,
    open: true,
  },
  build: {
    target: "es2022",
    sourcemap: false,
    assetsDir: "assets",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom")) return "vendor-react-dom";
          if (id.includes("react-router")) return "vendor-react-router";
          if (/[/\\]node_modules[/\\]react[/\\]/.test(id)) return "vendor-react";
        },
      },
    },
  },
});
