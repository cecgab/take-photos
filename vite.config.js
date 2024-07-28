import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/take-photos/",
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/styles/shared/variables.scss";
          @import "src/styles/shared/mixins.scss";
        `,
      },
    },
  },
});
