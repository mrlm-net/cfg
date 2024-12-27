import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json";
import { env } from "process";

export default defineConfig({
  build: {
    ssr: true,
    lib: {
      formats: ["es"],
      // Could also be a dictionary or array of multiple entry points
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        config: resolve(__dirname, "src/config.ts"),
        environment: resolve(__dirname, "src/environment.ts"),
        file: resolve(__dirname, "src/file.ts"),
        merge: resolve(__dirname, "src/merge.ts"),
        server: resolve(__dirname, "src/index.server.ts"),
      },
      name: pkg.name,
      // the proper extensions will be added
      fileName: pkg.name,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn"t be bundled
      // into your library
      external: ["node"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          "node": "node"
        },
      },
    },
  },
  plugins: [dts({
    rollupTypes: true,
    insertTypesEntry: true,
  })],
})