import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  base: '/fonts/',

  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    outDir: path.resolve(__dirname,'../../project-server/public/fonts'),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1280',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/fonts'),
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
