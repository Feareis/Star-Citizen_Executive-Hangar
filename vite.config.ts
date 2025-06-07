import { resolve } from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@assets": resolve(__dirname, "src/assets"),
      "@data": resolve(__dirname, "src/data"),
      "@layout": resolve(__dirname, "src/layout"),
      "@pages": resolve(__dirname, "src/pages"),
    },
  },
  optimizeDeps: {
    exclude: [],
  },
  build: {
    target: "es2017",
    sourcemap: false,
  },
  server: {
    fs: {
      strict: true,
    },
  },
});
