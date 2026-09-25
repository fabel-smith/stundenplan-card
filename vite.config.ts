import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

// HACS distributes the JS file, so ship the license texts inside that file.
const licenseBanner = "/*!\n" + ["LICENSE", "THIRD_PARTY_NOTICES"]
  .map((file) => readFileSync(new URL(file, import.meta.url), "utf8").trim())
  .join("\n\n") + "\n*/";

export default defineConfig({
  esbuild: {
    legalComments: "inline"
  },
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
        banner: licenseBanner,
        inlineDynamicImports: true,
        manualChunks: undefined
      }
    },

    emptyOutDir: true,
    outDir: "dist"
  }
});
