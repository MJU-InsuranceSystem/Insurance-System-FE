import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

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

export const createContract = async (
    insuranceId: string,
    contractData: ContractRequest
): Promise<void> => {
    try {
        const response = await axiosInstance.post(
            `/api/contracts/car/${insuranceId}`,
            contractData
        );
        console.log('계약 생성 성공:', response.data);
    } catch (error) {
        console.error('계약 생성 중 오류 발생:', error);

        if (error instanceof AxiosError) {
            const errorMessage =
                error.response?.data?.message || '계약 생성에 실패했습니다.';
            throw new Error(errorMessage);
        }

        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
};
