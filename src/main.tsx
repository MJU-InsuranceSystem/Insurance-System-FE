import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './components/routes/Router'; // Router 컴포넌트를 불러옵니다

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);
