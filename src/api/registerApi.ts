import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

// 회원가입 응답 타입 정의
export type RegisterResponse = {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    country: string;
    city: string;
    zipCode: string;
    birthDay: string;
    userType: string;
    hireYear?: number; // 직원일 경우 고용 연도
    role?: string;     // 직원일 경우 역할
};

// 회원가입 요청 데이터 타입 정의
export type RegisterData = {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    country: string;
    city: string;
    zipCode: string;
    birthDay: string;
    userType: 'CUSTOMER' | 'WORKER'; // 'CUSTOMER' 또는 'WORKER' 중 하나
    hireYear?: number; // 직원일 경우 고용 연도
    role?: string;     // 직원일 경우 역할
};

// 회원가입 API 함수
export const registerUser = async (userData: RegisterData): Promise<RegisterResponse> => {
    try {
        const response = await axiosInstance.post<RegisterResponse>(
            '/api/auth/sign-up',
            userData
        );
        console.log('회원가입 성공:', response.data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 409) { // 409: Conflict (중복 이메일 오류)
                throw new Error('이미 존재하는 이메일입니다. 다른 이메일을 사용해주세요.');
            }
            throw new Error(error.response?.data?.message || '회원가입에 실패했습니다.');
        }
        throw new Error('회원가입 중 오류가 발생했습니다.');
    }
};
