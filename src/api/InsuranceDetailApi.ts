import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

// Define Insurance Detail type
export interface InsuranceDetail {
    data: any;
    name: string;
    description: string;
    eligibleAgeMin: number;
    eligibleAgeMax: number;
    coverageRange: string;
    coverageAmountMax: number;
    duration: number;
    exclusions: string;
    monthlyPremium: number;
    salesStartDate: string;
    salesEndDate: string;
    saleTarget: string;
    insuranceType: string;
    workerName: string;
}

// Function to get insurance detail by ID
export const getInsuranceDetail = async (insuranceId: string): Promise<InsuranceDetail> => {
    try {
        const response = await axiosInstance.get<InsuranceDetail>(`/api/insurances/${insuranceId}`);
        console.log('API Response:', response.data);

        if (response.data) {
            return response.data;
        } else {
            throw new Error('유효하지 않은 응답 데이터 구조');
        }
    } catch (error) {
        console.error('보험 상세 정보 가져오기 중 오류 발생:', error);

        if (error instanceof AxiosError) {
            console.error('Axios 오류:', error.response?.status, error.response?.data);
            const errorMessage =
                error.response?.data?.message || '보험 상세 정보를 가져오는 데 실패했습니다.';
            throw new Error(errorMessage);
        }

        throw new Error('보험 상세 정보 가져오기 중 알 수 없는 오류가 발생했습니다.');
    }
};
