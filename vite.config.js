import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      config: path.resolve(__dirname, "/src/config.json"),
      styles: path.resolve(__dirname, "/src/styles"),
      components: path.resolve(__dirname, "/src/components"),
      hooks: path.resolve(__dirname, "/src/hooks"),
      pages: path.resolve(__dirname, "/src/pages"),
    },
  },
});
