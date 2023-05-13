import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   build: {
    minify: 'terser',
    chunkSizeWarningLimit: 1000, // Adjust the warning limit for chunk size (in bytes)
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react'],
          'react-dom': ['react-dom'],
          // Add any other large dependencies here as separate chunks
        },
      },
      // Adjust other rollup options as needed
    },
  },
})
