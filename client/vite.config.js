import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allow Docker to access the server
    strictPort: true,
    port: 5173,
    watch: {
      usePolling: true, // Fix for Windows file watching inside Docker
    }
  }
})