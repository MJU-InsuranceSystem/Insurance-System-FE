import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './components/routes/Router'; // Router 컴포넌트를 불러옵니다

// 환경 변수 확인 로그 추가
console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);
