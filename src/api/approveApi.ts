import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

type ReviewData = {
    reviewResult: 'APPROVE' | 'REJECTED';
    comments: string;
};

export const approvePlan = async (planId: string, reviewData: ReviewData): Promise<void> => {
    try {
        const response = await axiosInstance.patch(
            `/api/insurances/plans/${planId}/review`,
            reviewData
        );
        console.log('상품 승인 API 성공:', response.data);
    } catch (error) {
        console.error('상품 승인 API 실패:', error);

        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || '상품 승인에 실패했습니다.';
            throw new Error(errorMessage);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
};
