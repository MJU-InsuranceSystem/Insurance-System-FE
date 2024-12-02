import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import {
    SignUpWrapper,
    Title,
    Input,
    Button,
    CheckboxWrapper,
    Checkbox,
    CheckboxLabel,
    ErrorMessage,
    Select,
} from '../styles/RegisterStyles';
import { registerUser, RegisterData } from '../../api/registerApi';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [birthday, setBirthday] = useState<string>('');
    const [birthdayError, setBirthdayError] = useState<string | null>(null);
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [zipCodeError, setZipCodeError] = useState<string | null>(null);
    const [isConsentChecked, setIsConsentChecked] = useState(false);
    const [userType, setUserType] = useState<'CUSTOMER' | 'WORKER'>('CUSTOMER');
    const [country, setCountry] = useState('');
    const [hireYear, setHireYear] = useState<number | ''>('');
    const [role, setRole] = useState<string>('');
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailRegex.test(email) ? null : '유효한 이메일 주소를 입력해주세요.');
    };

    const validateName = (name: string) => {
        const nameRegex = /^[a-zA-Z가-힣]+$/;
        setNameError(nameRegex.test(name) ? null : '이름은 문자열만 입력해야 합니다.');
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^010-\d{4}-\d{4}$/;
        setPhoneError(phoneRegex.test(phone) ? null : '전화번호는 010-XXXX-XXXX 형식으로 입력해야 합니다.');
    };

    const validateZipCode = (zipCode: string) => {
        const zipCodeRegex = /^\d{5}$/;
        setZipCodeError(zipCodeRegex.test(zipCode) ? null : '우편번호는 5자리 숫자여야 합니다.');
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

    const isFormValid = () => {
        if (!name.trim() || !/^[a-zA-Z가-힣]+$/.test(name)) {
            alert('이름은 반드시 문자열로 입력해야 합니다.');
            return false;
        }
        if (!phone.trim() || !/^010-\d{4}-\d{4}$/.test(phone)) {
            alert('전화번호는 010-XXXX-XXXX 형식으로 입력해야 합니다.');
            return false;
        }
        if (!email.trim()) {
            alert('이메일을 입력해주세요.');
            return false;
        }
        validateEmail(email);
        if (emailError) {
            alert(emailError);
            return false;
        }
        if (!validateBirthday(birthday)) {
            return false;
        }
        if (!zipCode.match(/^\d{5}$/)) {
            alert('우편번호는 5자리 숫자여야 합니다.');
            return false;
        }
        if (!isConsentChecked) {
            alert('개인정보 처리에 동의해주세요.');
            return false;
        }
        if (userType === 'WORKER' && (!hireYear || !role.trim())) {
            alert('직원의 경우 고용 연도와 역할을 입력해야 합니다.');
            return false;
        }
        return true;
    };

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!isFormValid()) return;
    
        const userData: RegisterData = {
            name,
            email,
            password,
            phoneNumber: phone,
            country,
            city,
            zipCode,
            birthDay: birthday,
            userType,
        };
    
        if (userType === 'WORKER') {
            userData.hireYear = Number(hireYear);
            userData.role = role;
        }
    
        try {
            await registerUser(userData);
            alert('회원가입이 완료되었습니다!');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
        }
    };    

    return (
        <>
            <Header />
            <SignUpWrapper>
                <form onSubmit={handleSignUp}>
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
                        placeholder="전화번호를 입력해주세요. (예: 010-XXXX-XXXX)"
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
                        autoComplete="username"
                    />
                    {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

                    <Input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />

                    <Input
                        type="text"
                        placeholder="생년월일 (YYYY-MM-DD)"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                    {birthdayError && <ErrorMessage>{birthdayError}</ErrorMessage>}

                    <Input
                        type="text"
                        placeholder="도시를 입력하세요"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <Input
                        type="text"
                        placeholder="우편번호를 입력하세요"
                        value={zipCode}
                        onChange={(e) => {
                            setZipCode(e.target.value);
                            validateZipCode(e.target.value);
                        }}
                    />
                    {zipCodeError && <ErrorMessage>{zipCodeError}</ErrorMessage>}

                    <Input
                        type="text"
                        placeholder="국가를 입력하세요"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />

                    <Select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value as 'CUSTOMER' | 'WORKER')}
                    >
                        <option value="CUSTOMER">CUSTOMER</option>
                        <option value="WORKER">WORKER</option>
                    </Select>

                    {userType === 'WORKER' && (
                        <>
                            <Select
                                value={hireYear}
                                onChange={(e) => setHireYear(Number(e.target.value))}
                            >
                                <option value="">고용 연도를 선택하세요</option>
                                {Array.from({ length: 2024 - 1960 + 1 }, (_, i) => (
                                    <option key={i} value={1960 + i}>
                                        {1960 + i}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">역할을 선택하세요</option>
                                <option value="계약 관리 팀">계약 관리 팀</option>
                                <option value="상품 기획 팀">상품 기획 팀</option>
                                <option value="보상 지원 팀">보상 지원 팀</option>
                                <option value="보험 관리 팀">보험 관리 팀</option>
                                <option value="UW 팀">UW 팀</option>
                                <option value="납부 관리 팀">납부 관리 팀</option>
                            </Select>
                        </>
                    )}

                    <CheckboxWrapper>
                        <Checkbox
                            type="checkbox"
                            checked={isConsentChecked}
                            onChange={() => setIsConsentChecked(!isConsentChecked)}
                        />
                        <CheckboxLabel>개인정보 처리에 동의합니다.</CheckboxLabel>
                    </CheckboxWrapper>

                    <Button type="submit">회원가입 하기</Button>
                </form>
            </SignUpWrapper>
        </>
    );
};

export default Register;