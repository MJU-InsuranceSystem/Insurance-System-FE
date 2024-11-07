import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/page/Home'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} /> {/* 기본 경로에 Home 컴포넌트 렌더링 */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
