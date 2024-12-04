import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderContainer, ImageWrapper, AuthButtons } from './styles/AdminHeaderStyles';
import logo from '../assets/AdminImg.png';

const AdminHeader: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const email = localStorage.getItem('userEmail');
        if (token) {
            setIsLoggedIn(true);
            setUserEmail(email);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setUserEmail(null);
        navigate('/'); // 로그아웃 후 홈으로 이동
    };

    return (
        <HeaderContainer>
            <ImageWrapper>
                {/* 로고 클릭 시 AdminHome으로 이동 */}
                <Link to="/adminHome">
                    <img src={logo} alt="Logo" />
                </Link>
            </ImageWrapper>
            <AuthButtons>
                {isLoggedIn ? (
                    <>
                        <span>{userEmail}</span>
                        <Link to="/myPage/:subscriberId">
                            <button>마이페이지</button>
                        </Link>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button>로그인</button>
                        </Link>
                        <Link to="/register">
                            <button>회원가입</button>
                        </Link>
                    </>
                )}
            </AuthButtons>
        </HeaderContainer>
    );
};

export default AdminHeader;
