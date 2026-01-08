import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/stundenplan-card.ts",
      formats: ["es"],
      fileName: () => "stundenplan-card.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      // Home Assistant liefert seine eigenen Web Components; wir bundlen kein Lit o.ä.
      external: [],
    },
  },
});
