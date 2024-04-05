import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Match all requests starting with "/api/" and forward them to the backend
      '/api': {
        target: 'http://192.168.154.191:3001',
        changeOrigin: true,
        secure: false, // Set to true for HTTPS connections in production
      },
    }
  }
})
