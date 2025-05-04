import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // cualquier llamada a /api/... en 5173
      // se reemplaza por http://localhost:5000/api/...
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        // opcional: si tu backend responde en /api,
        // no hace falta rewrite
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
