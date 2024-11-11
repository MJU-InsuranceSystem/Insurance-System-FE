import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

export type LoginResponse = {
    httpStatusCode: number; // httpStatusCode 속성 추가
    responseCode: string; // responseCode 속성 추가
    success: boolean;
    message?: string;
    data?: { accessToken: string; refreshToken: string }; // 백엔드에서 반환하는 데이터 형식
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post<LoginResponse>(
            '/api/auth/sign-in',
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // 쿠키 포함 설정
            }
        );
        console.log('로그인 성공:', response.data);

        // 응답 데이터가 토큰 정보를 포함하는 경우 처리
        if (response.data && response.data.data) {
            console.log('Access Token:', response.data.data.accessToken);
        }

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Axios 오류 상태 코드:', error.response?.status);
            console.error('Axios 오류 데이터:', error.response?.data);
            throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
        }
        throw new Error('로그인 중 오류가 발생했습니다.');
    }
};
