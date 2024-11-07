import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header'; // Header 컴포넌트 임포트
import { Card, Title, Input, Button, Wrapper, RegisterButton } from '../styles/LoginStyles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            setEmailError(null);
        } else if (!emailRegex.test(email)) {
            setEmailError('유효한 이메일 주소를 입력해주세요.');
        } else {
            setEmailError(null);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid()) return;

        // 로그인 성공 가정하고 다음 페이지로 이동
        console.log('로그인 성공');
        navigate('/');
    };

    const isFormValid = () => {
        return email.trim() !== '' && password.trim() !== '' && emailError === null;
    };

    return (
        <>
            <Header />
            <Wrapper>
                <Card>
                    <Title>
                        <span style={{ color: 'black' }}>아래 </span>
                        <span style={{ color: '#1058A3' }}>로그인 </span>
                        <span style={{ color: 'black' }}>하기 위한 정보를 입력해주세요</span>
                    </Title>
                    <form onSubmit={handleLogin}>
                        <div>
                            <Input
                                type="text"
                                placeholder="이메일"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            {emailError && (
                                <div style={{ color: 'red', fontSize: '0.8rem' }}>
                                    {emailError}
                                </div>
                            )}
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={!isFormValid()}
                            style={{ backgroundColor: isFormValid() ? '#1058A3' : '#ccc' }}
                        >
                            로그인
                        </Button>
                    </form>
                    <Link to="/register">
                        <RegisterButton>회원가입</RegisterButton>
                    </Link>
                </Card>
            </Wrapper>
        </>
    );
};

export default Login;
