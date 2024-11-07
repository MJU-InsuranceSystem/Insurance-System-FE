interface ImportMetaEnv {
  VITE_API_BASE_URL: string; // 환경 변수 타입 선언
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// CSS 모듈에 대한 선언 추가
declare module '*.css';
