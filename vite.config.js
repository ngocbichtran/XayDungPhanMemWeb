import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  // THÊM ĐOẠN NÀY ĐỂ CHẠY LOCAL KHÔNG BỊ LỖI CORS
  server: {
    proxy: {
      '/api-ha-store': {
        target: 'https://effulgent-biscochitos-797078.netlify.app/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-ha-store/, ''),
      },
    },
  },
})