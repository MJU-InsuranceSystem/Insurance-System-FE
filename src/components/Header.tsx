import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderContainer, ImageWrapper, AuthButtons } from './styles/HeaderStyles';
import logo from '../assets/img.png';

const Header: React.FC = () => {
    const subscriberId = 1; // 예: 현재 로그인된 사용자의 ID (추후 상태 관리나 API 호출로 대체 가능)

    return (
        <HeaderContainer>
            <ImageWrapper>
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </ImageWrapper>
            <AuthButtons>
                <Link to={`/myPage/${subscriberId}`}>
                    <button>마이페이지</button>
                </Link>
                <Link to="/login">
                    <button>로그인</button>
                </Link>
                <Link to="/register">
                    <button>회원가입</button>
                </Link>
            </AuthButtons>
        </HeaderContainer>
    );
};

export default Header;
