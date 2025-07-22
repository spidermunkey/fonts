import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  resolve: {
    alias: {
      context: path.resolve(__dirname, './src/context'),
      store: path.resolve(__dirname, './src/store'),
      utils: path.resolve(__dirname, './src/utils'),
      hooks: path.resolve(__dirname,'./src/hooks'),
      icons: path.resolve(__dirname,'./src/assets/icons'),
      elements: path.resolve(__dirname,'./src/elements'),
      components: path.resolve(__dirname,'./src/components'),
    }
  }
})
