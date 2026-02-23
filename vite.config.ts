import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2020",
    minify: true,
    sourcemap: false,

    lib: {
      entry: "src/stundenplan-card.ts",
      formats: ["es"],
      fileName: () => "stundenplan-card.js"
    },

    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined
      }
    },

    emptyOutDir: true,
    outDir: "dist"
  }
});