import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

export type ProductRequest = {
    name: string;
    description: string;
    eligibleAgeMin: string;
    eligibleAgeMax: string;
    coverageRange: string;
    coverageAmountMax: string;
    duration: string;
    exclusions: string;
    monthlyPremium: string;
    salesStartDate: string;
    salesEndDate: string;
    saleTarget: string;
    insuranceType: string;
};

export type ProductResponse = {
    id: string;
    name: string;
    description: string;
    eligibleAgeMin: string;
    eligibleAgeMax: string;
    coverageRange: string;
    coverageAmountMax: string;
    duration: string;
    exclusions: string;
    monthlyPremium: string;
    salesStartDate: string;
    salesEndDate: string;
    saleTarget: string;
    insuranceType: string;
    // 기타 필요한 필드들
};

// 보험 상품 생성 함수
export const createProduct = async (productData: ProductRequest): Promise<ProductResponse> => {
    try {
        const response = await axiosInstance.post('/api/insurances', productData);
        console.log('보험 상품 생성 성공:', response.data);
        return response.data;  // 생성된 보험 상품의 정보를 반환
    } catch (error) {
        console.error('보험 상품 생성 중 오류 발생:', error);

        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || '보험 상품 생성에 실패했습니다.';
            throw new Error(errorMessage);
        }

        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
};
