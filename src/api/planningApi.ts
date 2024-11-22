import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

export type PlanResponse = {
    id: string;
    title: string;
    description: string;
    plannerName: string;
    insurancePlanType: string;
    fileUrl: string;
    createdAt: string;
};

type PlanData = {
    title: string;
    description: string;
    plannerName: string;
    insurancePlanType: string;
    file: File;
};

export const createPlan = async (planData: PlanData): Promise<PlanResponse> => {
    try {
        const formData = new FormData();
        formData.append('title', planData.title);
        formData.append('description', planData.description);
        formData.append('plannerName', planData.plannerName);
        formData.append('insurancePlanType', planData.insurancePlanType);
        formData.append('file', planData.file);

        // 디버깅: FormData 내용 출력
        console.log('FormData 디버깅:');
        for (const [key, value] of formData.entries()) {
            console.log(`Key: ${key}, Value:`, value instanceof File ? value.name : value);
        }

        const response = await axiosInstance.post<PlanResponse>(
            '/api/insurances/plans',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // 서버가 multipart/form-data 처리
                },
            }
        );

        console.log('API 요청 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);

        if (error instanceof AxiosError) {
            console.error('Axios 오류:', error.response?.status, error.response?.data);
            const errorMessage = error.response?.data?.message || '기획 데이터 생성에 실패했습니다.';
            throw new Error(errorMessage);
        }
        throw new Error('기획 데이터 생성 중 알 수 없는 오류가 발생했습니다.');
    }
};
