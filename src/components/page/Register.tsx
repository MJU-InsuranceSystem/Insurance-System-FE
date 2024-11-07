import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import {
    SignUpWrapper,
    Title,
    Input,
    Button,
    ConsentText,
    CheckboxWrapper,
    Checkbox,
    CheckboxLabel,
    ErrorMessage,
    Select,
} from '../styles/RegisterStyles';

const Register: React.FC = () => {
    const [gender, setGender] = useState('남자');
    const [consent, setConsent] = useState('');
    const [isConsentChecked, setIsConsentChecked] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [birthday, setBirthday] = useState<string>('');
    const [birthdayError, setBirthdayError] = useState<string | null>(null);
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setEmailError(null);
        } else {
            setEmailError('유효한 이메일 주소를 입력해주세요.');
        }
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^(010-\d{4}-\d{4})$/;
        if (phoneRegex.test(phone)) {
            setPhoneError(null);
        } else {
            setPhoneError('전화번호는 010-XXXX-XXXX 형식으로 입력해야 합니다.');
        }
    };

    const validateName = (name: string) => {
        const nameRegex = /^[a-zA-Z가-힣]+$/;
        if (nameRegex.test(name)) {
            setNameError(null);
        } else {
            setNameError('이름은 문자열만 입력해야 합니다.');
        }
    };

    const validateBirthday = (birthday: string) => {
        const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!birthdayRegex.test(birthday)) {
            setBirthdayError('생일은 YYYY-MM-DD 형식이어야 합니다.');
            return false;
        }
        setBirthdayError(null);
        return true;
    };

    const handleSignUp = () => {
        if (!isFormValid()) {
            return; // 유효성 검사 실패 시 종료
        }

        // 회원가입 로직을 처리한 후 홈 페이지로 이동
        navigate('/');
    };

    const handleConsentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setConsent(event.target.value);
    };

    const handleCheckboxChange = () => {
        setIsConsentChecked((prev) => !prev);
    };

    const isFormValid = () => {
        if (name.trim() === '' || !/^[a-zA-Z가-힣]+$/.test(name)) {
            alert('이름은 반드시 문자열로 입력해야 합니다.');
            return false;
        }
        if (phone.trim() === '' || !/^(010-\d{4}-\d{4})$/.test(phone)) {
            alert('전화번호는 010-XXXX-XXXX 형식으로 입력해야 합니다.');
            return false;
        }
        if (email.trim() === '') {
            alert('이메일을 입력해주세요.');
            return false;
        }
        validateEmail(email); // 이메일 형식 검증
        if (emailError) {
            alert(emailError); // 유효하지 않은 이메일 경고
            return false;
        }
        if (!validateBirthday(birthday)) {
            return false; // 생일 형식 검증 실패
        }
        if (!isConsentChecked) {
            alert('개인정보 처리에 동의해주세요.');
            return false;
        }
        return true; // 모든 검증 통과
    };

    return (
        <>
            <Header />
            <SignUpWrapper>
                <Title>
                    아래 <span>회원가입</span>을 위한 정보를 입력해주세요.
                </Title>
                <Input
                    type="text"
                    placeholder="이름을 입력해주세요."
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        validateName(e.target.value);
                    }}
                />
                {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

                <Input
                    type="text"
                    placeholder="전화번호를 입력해주세요."
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                        validatePhone(e.target.value);
                    }}
                />
                {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}

                <Input
                    type="text"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                    }}
                />
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

                <Input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                    type="text"
                    placeholder="생년월일 (YYYY-MM-DD)"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
                {birthdayError && <ErrorMessage>{birthdayError}</ErrorMessage>}

                <Select onChange={handleConsentChange}>
                    <option value="">개인정보처리 동의서</option>
                    <option value="consent1">동의서 1</option>
                    <option value="consent2">동의서 2</option>
                    <option value="consent3">동의서 3</option>
                </Select>

                {consent && (
                    <ConsentText>
                        {consent === 'consent1' && '개인정보처리 동의서 1의 내용입니다.'}
                        {consent === 'consent2' && '개인정보처리 동의서 2의 내용입니다.'}
                        {consent === 'consent3' && '개인정보처리 동의서 3의 내용입니다.'}
                    </ConsentText>
                )}

                <CheckboxWrapper>
                    <Checkbox
                        type="checkbox"
                        checked={isConsentChecked}
                        onChange={handleCheckboxChange}
                    />
                    <CheckboxLabel>개인정보 처리에 동의합니다.</CheckboxLabel>
                </CheckboxWrapper>

                <Button onClick={handleSignUp}>
                    회원가입 하기
                </Button>
            </SignUpWrapper>
        </>
    );
};

export default Register;
