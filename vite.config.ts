import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true, // 서버 시작 시 브라우저 열기
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 백엔드 서버 주소
        changeOrigin: true, // Origin 헤더 변경
        rewrite: (path) => path.replace(/^\/api/, '') // 경로 재작성
      }
    }
  }
});
