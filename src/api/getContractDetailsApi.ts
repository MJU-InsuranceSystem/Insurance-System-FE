import axiosInstance from "./axiosInstance";

export interface ContractInformation {
    paymentDate: number; // 결제일
    paymentMethod: string; // 결제 방식
    paymentAccount: string; // 결제 계좌
    bank: string; // 은행
    startDate: string; // 계약 시작일
    endDate: string; // 계약 종료일
}

export interface LicenseInformation {
    licenseNumber: string; // 면허 번호
    licenseType: string; // 면허 유형
    issueDate: string; // 발급일
    validityPeriod: string; // 유효 기간
}

export interface CarInformation {
    carNumber: string; // 차량 번호
    carType: string; // 차량 유형
    modelYear: string; // 모델 연도
    registrationDate: string; // 등록일
    ownershipStatus: string; // 소유 상태
    accidentFreePeriod: number; // 무사고 기간
}

export interface ContractDetails {
    contractId: number; // 계약 ID
    contractInformation: ContractInformation; // 계약 정보
    license: LicenseInformation; // 면허 정보
    carInformation: CarInformation; // 차량 정보
}

export const getContractDetails = async (contractId: number): Promise<ContractDetails> => {
    try {
        const response = await axiosInstance.get(`/api/contracts/car/${contractId}`);
        console.log("API Response:", response.data);

        if (response.data.httpStatusCode === 200 && response.data.resultType === "SUCCESS") {
            return response.data.data; // 상세 정보 반환
        } else {
            throw new Error(response.data.message || "상세 정보를 가져오는 중 오류가 발생했습니다.");
        }
    } catch (error: any) {
        console.error("계약 상세 조회 API 호출 중 오류 발생:", error);

        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "계약 상세 정보를 가져오는 데 실패했습니다.");
        }

        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("알 수 없는 오류가 발생했습니다.");
    }
};
