import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

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

// 계약 생성 API
export const createContract = async (
    insuranceId: string,
    contractData: ContractRequest
): Promise<{ customerId: string }> => {
    try {
        const response = await axiosInstance.post(
            `/api/contracts/car/${insuranceId}`,
            contractData
        );
        console.log("계약 생성 성공:", response.data);
        return { customerId: response.data.customerId };
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("API Error:", error.response?.data);
            throw new Error(
                error.response?.data?.message || "계약 생성에 실패했습니다."
            );
        }
        throw new Error("알 수 없는 오류가 발생했습니다.");
    }
};
export const saveTemporaryContract = async (
    insuranceId: string,
    contractData: ContractRequest
): Promise<{ message: string }> => {
    const sanitizedData = {
        contractRequestDto: contractData.contractRequestDto || {},
        driverLicenseRequestDto: contractData.driverLicenseRequestDto || {},
        carRequestDto: contractData.carRequestDto || {},
    };

    console.log("Sanitized Request Data for Cache:", JSON.stringify(sanitizedData, null, 2));

    try {
        const response = await axiosInstance.post(
            `/api/contracts/car/cache/${insuranceId}`, // 캐시 서버를 위한 엔드포인트
            sanitizedData
        );
        console.log("캐시 서버 저장 성공:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.error("=== 캐시 서버 저장 실패 ===", error);
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.message || "캐시 서버에 임시 저장에 실패했습니다."
            );
        }
        throw new Error("알 수 없는 오류가 발생했습니다.");
    }
};


