import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

export type InsurancePlan = {
    id: string;
    title: string;
    insurancePlanType: string;
    plannerName: string;
    description: string;
};

// 보험 플랜 목록 가져오기
export const getInsurancePlans = async (): Promise<InsurancePlan[]> => {
    try {
        const response = await axiosInstance.get<InsurancePlan[]>('/api/insurance/plans');
        console.log('플랜 데이터 가져오기 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('플랜 가져오기 중 오류 발생:', error);

        if (error instanceof AxiosError) {
            console.error('Axios 오류:', error.response?.status, error.response?.data);
            const errorMessage =
                error.response?.data?.message || '플랜 데이터를 가져오는 데 실패했습니다.';
            throw new Error(errorMessage);
        }
        throw new Error('플랜 가져오기 중 알 수 없는 오류가 발생했습니다.');
    }
};
