import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://backend:5000",     //backend para docker //localhost para local
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      "/uploads": {
        target: "http://backend:5000",      //backend para docker //localhost para local
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
