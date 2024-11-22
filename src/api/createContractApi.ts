import axiosInstance from './axiosInstance'; // axios 인스턴스
import { AxiosError } from 'axios';

// 계약 생성 요청 타입 정의
export interface ContractRequest {
    contractRequestDto: {
        paymentDate: string;
        paymentMethod: string;
        paymentAccount: string;
        bank: string;
        startDate: string;
        endDate: string;
    };
    driverLicenseRequestDto: {
        licenseNumber: string;
        licenseType: string;
        issueDate: string;
        validityPeriod: string;
    };
    carRequestDto: {
        carNumber: string;
        carType: string;
        modelYear: string;
        registrationDate: string;
        ownershipStatus: string;
        accidentFreePeriod: string;
    };
}

// 계약 생성 API 함수
export const createContract = async (
    insuranceId: string,
    contractData: ContractRequest
): Promise<void> => {
    console.log('전송할 데이터:', { insuranceId, contractData });

    try {
        const response = await axiosInstance.post(
            `/api/contracts/car/${insuranceId}`, // 계약 생성 API 호출
            contractData
        );
        console.log('계약 생성 성공:', response.data);
    } catch (error) {
        console.error('계약 생성 중 오류 발생:', error);

        if (error instanceof AxiosError) {
            console.error('Axios 응답 상태 코드:', error.response?.status);
            console.error('Axios 응답 데이터:', error.response?.data);

            const errorMessage =
                error.response?.data?.message || '계약 생성에 실패했습니다.';
            throw new Error(errorMessage);
        }

        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
};
