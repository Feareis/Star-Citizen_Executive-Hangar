/*
 * Star Citizen - Executive Hangar, Based Project
 * Copyright (c) 2025 Feareis
 * SPDX-License-Identifier: MIT
 * Author: https://github.com/Feareis
 */

import { resolve } from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Main Vite configuration
export default defineConfig({
  plugins: [tailwindcss(), react()],

  // Path aliases for easier imports
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@assets": resolve(__dirname, "src/assets"),
      "@data": resolve(__dirname, "src/data"),
      "@layout": resolve(__dirname, "src/layout"),
      "@pages": resolve(__dirname, "src/pages"),
    },
  },

  // Dependency optimizer
  optimizeDeps: {
    exclude: [],
  },

  // Build output settings
  build: {
    target: "es2017", // Modern browser target
    sourcemap: false,
  },

  // Development server settings
  server: {
    fs: {
      strict: true,
    },
  },
});
