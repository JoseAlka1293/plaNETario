import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // cualquier llamada a /api/... en 5173
      // se reemplaza por http://localhost:5000/api/...
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        // opcional: si tu backend responde en /api,
        // no hace falta rewrite
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // ...y ahora esto para tus ficheros subidos
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        // opcionalmente, si tu backend monta el static en "/uploads" exacto,
        // no necesitas rewrite. Si tuvieras que cambiar el prefijo,
        // podrías usar rewrite: (path) => path.replace(/^\/uploads/, '/uploads')
      },
    },
  },
});
