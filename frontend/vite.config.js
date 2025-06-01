import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mediapipe: ['@mediapipe/pose', '@mediapipe/drawing_utils', '@mediapipe/camera_utils']
        }
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true
  }
})
