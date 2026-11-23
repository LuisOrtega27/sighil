import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { cwd } from 'node:process'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '')

  /* En desarrollo la SPA llama a /api en su propio origen: asi la cookie de
     sesion es de primera parte y SameSite=Lax funciona con cualquier host
     (localhost o la IP de la red). El proxy corre en la maquina de Vite. */
  const apiUrl = env.VITE_API_URL || 'http://127.0.0.1:4000/api'
  const proxyTarget = /^https?:\/\//.test(apiUrl)
    ? apiUrl.replace(/\/api\/?$/, '')
    : 'http://127.0.0.1:4000'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
