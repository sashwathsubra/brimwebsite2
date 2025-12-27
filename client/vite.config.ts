import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    sourcemap: false,
    cssCodeSplit: true,
    modulePreload: { polyfill: true },
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@radix-ui")) return "radix";
            if (id.includes("recharts")) return "recharts";
            if (id.includes("@tanstack/react-query")) return "react-query";
            if (id.includes("lucide-react")) return "icons";
            return "vendor";
          }
        },
      },
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
}));
