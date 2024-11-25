// viewPayClaimAllApi.ts

import axiosInstance from "./axiosInstance";

export interface Claim {
    id: string; // 청구내역 ID
    accidentTitle: string; // 사건 제목
    payerName: string; // 지급자
    paymentAmount: string; // 지급 금액
    comments: string; // 지급 이유
}

/**
 * 보험금 지급 내역 전체 조회 API 호출
 * @returns Promise<Claim[]>
 */
export const fetchAllClaims = async (): Promise<Claim[]> => {
    try {
        const response = await axiosInstance.get<{ 
            httpStatusCode: number; 
            message: string; 
            data: Claim[]; 
            resultType: string; 
            responseCode: string; 
        }>('/api/claims');
        
        if (response.status !== 200) {
            throw new Error("보험금 지급 내역 조회 중 오류가 발생했습니다.");
        }

        return response.data.data; // data 속성에서 Claims 배열을 반환
    } catch (error) {
        console.error("보험금 지급 내역 조회 중 오류 발생:", error);
        throw new Error("보험금 지급 내역 조회 중 알 수 없는 오류가 발생했습니다.");
    }
};
