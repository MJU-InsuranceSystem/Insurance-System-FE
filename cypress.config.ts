import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5174', // 서버 URL을 5174 포트로 수정
    setupNodeEvents(on, config) {
      // Node 이벤트 설정
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // 테스트 파일 경로 패턴
  },
  env: {
    apiBaseUrl: 'https://api.mju-insurance.xyz', // API 기본 경로 설정 (변경 없음)
  },
});
