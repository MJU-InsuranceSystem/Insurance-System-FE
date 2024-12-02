import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://localhost:8080', // 백엔드 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 경로 재작성
      }
    }
  }
});
