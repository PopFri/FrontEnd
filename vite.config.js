import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: true,
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    target: 'es2022'
  },
  plugins: [react()],
})