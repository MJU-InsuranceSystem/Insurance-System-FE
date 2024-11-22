import axios from 'axios';
import { getAccessToken } from '../utils/getAccessToken';

// axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken('accessToken');
        if (token) {
            config.headers['Authorization'] = `BEARER ${token}`; // BEARER 대문자 사용
        }
        // 요청 디버깅 로그 추가
        console.log('=== Request Sent ===');
        console.log('URL:', config.url); // 요청 URL
        console.log('Method:', config.method); // 요청 메서드 (GET, POST 등)
        console.log('Headers:', config.headers); // 요청 헤더
        console.log('Body:', config.data); // 요청 본문
        return config;
    },
    (error) => {
        console.error('Request Interceptor Error:', error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => {
        // 응답 디버깅 로그 추가
        console.log('=== Response Received ===');
        console.log('Status:', response.status); // HTTP 상태 코드
        console.log('Data:', response.data); // 응답 데이터
        return response;
    },
    (error) => {
        // 오류 디버깅 로그 추가
        if (error.response) {
            console.error('=== Response Error ===');
            console.error('Status:', error.response.status); // HTTP 상태 코드
            console.error('Headers:', error.response.headers); // 응답 헤더
            console.error('Data:', error.response.data); // 응답 데이터
        } else {
            console.error('Error Message:', error.message); // 네트워크 오류 등
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
