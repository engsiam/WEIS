import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Split long-lived vendor code into stable chunks for better caching.
        // Order matters: "@tanstack/react-router" also contains "react".
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("@tanstack")) return "vendor-router";
          if (id.includes("motion")) return "vendor-motion";
          if (id.includes("react") || id.includes("scheduler")) {
            return "vendor-react";
          }
          return undefined;
        },
      },
    },
  },
});
