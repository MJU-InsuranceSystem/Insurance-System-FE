import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminHeader from '../AdminHeader'; // Assuming you have a separate AdminHeader component
import {
    Card,
    Title,
    Input,
    Button,
    Wrapper,
    RegisterButton,
    ErrorMessage
} from '../styles/LoginStyles'; // You can keep the same styles for now

import { loginUser } from '../../api/loginApi';

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Email validation
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(email.trim() === '' ? null : !emailRegex.test(email) ? '유효한 이메일 주소를 입력해주세요.' : null);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid()) {
            console.log('폼 유효하지 않음');
            return;
        }

        try {
            const response = await loginUser(email, password);

            if (response.httpStatusCode === 200 && response.responseCode === 'SUCCESS') {
                setLoginError(null);
                const accessToken = response.data?.accessToken;

                // Save accessToken in localStorage
                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('userEmail', email); // Store email
                }

                const userType = localStorage.getItem('userType');
                if (userType === 'WORKER') {
                    navigate('/adminHome'); // Redirect to admin home if worker
                }
            } else {
                setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
            }
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error);
            setLoginError(error instanceof Error ? error.message : '로그인에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    const isFormValid = () => {
        return email.trim() !== '' && password.trim() !== '' && emailError === null;
    };

    return (
        <>
            <AdminHeader /> {/* Use AdminHeader here */}
            <Wrapper>
                <Card>
                    <Title>
                        <span style={{ color: 'black' }}>아래 </span>
                        <span style={{ color: '#1058A3' }}>관리자 로그인</span>
                        <span style={{ color: 'black' }}> 하기 위한 정보를 입력해주세요</span>
                    </Title>
                    <form onSubmit={handleLogin}>
                        <Input
                            type="text"
                            placeholder="이메일"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            autoComplete="email"
                        />
                        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
                        <Input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            disabled={!isFormValid()}
                            style={{ backgroundColor: isFormValid() ? '#1058A3' : '#ccc' }}
                        >
                            로그인
                        </Button>
                        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
                    </form>
                    <Link to="/register">
                        <RegisterButton>회원가입</RegisterButton>
                    </Link>
                </Card>
            </Wrapper>
        </>
    );
};

export default AdminLogin;
