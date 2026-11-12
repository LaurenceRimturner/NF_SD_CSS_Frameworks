import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // The `@/` alias is needed by shadcn/ui. It must match `paths` in tsconfig.json.
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5.3 still uses the old Sass APIs internally.
        api: "modern",
        silenceDeprecations: ["import", "global-builtin", "color-functions", "if-function", "mixed-decls"],
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
