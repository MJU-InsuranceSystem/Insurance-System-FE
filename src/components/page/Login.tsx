import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import { Card, Title, Input, Button, Wrapper, RegisterButton, ErrorMessage } from '../styles/LoginStyles';
import { loginUser } from '../../api/loginApi';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();

    // 이메일 유효성 검사
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(email.trim() === '' ? null : !emailRegex.test(email) ? '유효한 이메일 주소를 입력해주세요.' : null);
        console.log(`이메일 유효성 검사: ${email}, 결과: ${emailError}`); // 유효성 검사 결과 출력
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        console.log(`이메일 변경: ${newEmail}`); // 이메일 변경 시 로그
        validateEmail(newEmail);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`폼 제출됨: 이메일=${email}, 비밀번호=${password}`); // 폼 제출 로그
        if (!isFormValid()) {
            console.log('폼 유효하지 않음'); // 폼이 유효하지 않을 때 로그
            return;
        }

        try {
            const response = await loginUser(email, password);
            console.log('로그인 응답:', response); // 응답 로그로 확인

            // 로그인 성공 조건 수정
            if (response.httpStatusCode === 200 && response.responseCode === 'SUCCESS') {
                console.log('로그인 성공');
                setLoginError(null); // 로그인 오류 메시지 초기화
                document.cookie = `accessToken=${response.data?.accessToken}; path=/`; // 쿠키 설정 확인
                console.log('쿠키 설정 완료'); // 쿠키 설정 로그
                console.log('navigate("/") 호출됨'); // navigate 호출 로그
                navigate('/'); // 성공 시 홈 화면으로 이동
            } else {
                console.log('로그인 실패 조건에 진입');
                setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.'); // 고정된 실패 메시지
            }
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error); // 오류 발생 시 로그
            setLoginError(error instanceof Error ? error.message : '로그인에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    const isFormValid = () => {
        const isValid = email.trim() !== '' && password.trim() !== '' && emailError === null;
        console.log(`폼 유효성 검사: ${isValid}`); // 폼 유효성 검사 결과 로그
        return isValid;
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
                                console.log(`비밀번호 변경: ${e.target.value}`); // 비밀번호 변경 시 로그
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

export default Login;
