import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from '../utils/getAccessToken';

// axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080', // 기본값 설정
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 필요 시 활성화
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken('accessToken');
        console.log('Retrieved Token:', token);

        if (token) {
            config.headers = config.headers || {};
            (config.headers as AxiosHeaders).set('Authorization', `BEARER ${token}`);
        }

        const fullUrl = `${config.baseURL || ''}${config.url || ''}`; // 타입 안전하게 URL 결합
        console.log('=== Request Sent ===');
        console.log('Full URL:', fullUrl); // 요청 URL
        console.log('Method:', config.method); // HTTP 메서드
        console.log('Headers:', config.headers); // 요청 헤더
        console.log('Body:', config.data || 'No Body'); // 요청 본문 (없으면 No Body)

        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('=== Response Received ===');
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('=== Response Error ===');
            console.error('Status:', error.response.status); // HTTP 상태 코드
            console.error('Headers:', error.response.headers); // 응답 헤더
            console.error('Data:', error.response.data); // 응답 데이터
        } else {
            console.error('Axios Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
