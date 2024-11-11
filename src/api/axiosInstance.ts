// axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 쿠키를 포함하려면 추가
});

export default axiosInstance;