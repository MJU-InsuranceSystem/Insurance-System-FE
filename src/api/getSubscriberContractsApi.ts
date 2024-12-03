import axiosInstance from "./axiosInstance";

export interface ContractInformation {
    paymentDate: number; // 결제일
    paymentMethod: string; // 결제 방식
    paymentAccount: string; // 결제 계좌
    bank: string; // 은행
    startDate: string; // 계약 시작일
    endDate: string; // 계약 종료일
}

export interface Contract {
    contractId: number; // 계약 ID
    approveStatus: string; // 승인 상태
    contractInformation: ContractInformation; // 계약 정보
    insuranceName: string; // 보험 이름 추가
}

export const getSubscriberContracts = async (): Promise<Contract[]> => {
    try {
        const response = await axiosInstance.get("/api/contracts/subscribers");
        console.log("API Response:", response.data);

        if (response.data.httpStatusCode === 200 && response.data.resultType === "SUCCESS") {
            return response.data.data; // 계약 정보 배열 반환
        } else {
            throw new Error(response.data.message || "데이터를 가져오는 중 오류가 발생했습니다.");
        }
    } catch (error: any) {
        console.error("고객 계약 조회 API 호출 중 오류 발생:", error);

        if (error.response && error.response.data) {
            // AxiosError 처리
            const errorMessage = error.response.data.message || "고객 계약 정보를 가져오는 데 실패했습니다.";
            throw new Error(errorMessage);
        }

        if (error instanceof Error) {
            // 일반적인 JavaScript 에러 처리
            throw new Error(error.message);
        }

        // 알 수 없는 에러 처리
        throw new Error("알 수 없는 오류가 발생했습니다.");
    }
};
