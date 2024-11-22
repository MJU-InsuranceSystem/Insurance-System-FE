import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

export type Insurance = {
    id: number;
    name: string;
    description: string;
    insuranceType: string;
    saleTarget: string;
    monthlyPremium: number;
    eligibleAgeMin: number;
    eligibleAgeMax: number;
};

export const getInsuranceList = async (): Promise<Insurance[]> => {
    try {
        const response = await axiosInstance.get('/api/insurances');
        console.log('API 응답 데이터:', response.data);

        // 데이터 구조가 배열인지 확인
        if (Array.isArray(response.data)) {
            return response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            throw new Error('유효하지 않은 응답 데이터 구조');
        }
    } catch (error) {
        console.error('보험 상품 데이터 가져오기 중 오류 발생:', error);

        if (error instanceof AxiosError) {
            console.error('Axios 오류:', error.response?.status, error.response?.data);
            const errorMessage =
                error.response?.data?.message || '보험 상품 데이터를 가져오는 데 실패했습니다.';
            throw new Error(errorMessage);
        }

        throw new Error('보험 상품 데이터 가져오기 중 알 수 없는 오류가 발생했습니다.');
    }
};
