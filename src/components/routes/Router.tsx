import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../page/Home';
import Login from '../page/Login';
import Register from '../page/Register';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
