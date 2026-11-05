// vite.config.ts

import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import path from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "vite";

function tokensWatchPlugin(): Plugin {
  return {
    name: "tokens-watch-plugin",
    handleHotUpdate({ file }) {
      if (file.endsWith("theme.ts")) {
        try {
          execSync(
            "node --experimental-strip-types src/scripts/generate-tokens.ts",
          );
          console.log(
            "⚡ Auto-regenerated src/styles/tokens.css from theme.ts",
          );
        } catch (e) {
          console.error("Failed to generate tokens:", e);
        }
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tokensWatchPlugin(),
    tailwindcss(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackRouter(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
