import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

// 승인 요청
export const approvePlan = async (
    planId: string,
    reviewResult: 'APPROVED' | 'REJECTED',
    comments: string
): Promise<void> => {
    try {
        const response = await axiosInstance.patch(`/api/insurances/plans/${planId}/review`, {
            reviewResult,
            comments,
        });
        console.log('승인 요청 성공:', response.data);
    } catch (error) {
        console.error('승인 요청 중 오류 발생:', error);

        if (error instanceof AxiosError) {
            const errorMessage =
                error.response?.data?.message || '승인 요청 중 문제가 발생했습니다.';
            throw new Error(errorMessage);
        }

        throw new Error('승인 요청 중 알 수 없는 오류가 발생했습니다.');
    }
};
