import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ai-powered-campaign-generator/',
  server: {
    port: 5173,
    strictPort: true,
  },
})
