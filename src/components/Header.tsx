import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderContainer, ImageWrapper, AuthButtons } from './styles/HeaderStyles';
import logo from '../assets/img.png';

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <ImageWrapper>
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </ImageWrapper>
            <AuthButtons>
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
