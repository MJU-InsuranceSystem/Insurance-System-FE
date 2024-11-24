import axiosInstance from "./axiosInstance";

export interface Accident {
    id: number;
    title: string;
    accidentDate: string;
    damageAmount: number;
    accidentType: string;
    liabilityStatus: string;
}

export const getAllAccidents = async (): Promise<Accident[]> => {
    try {
        const response = await axiosInstance.get("/api/accidents");
        return response.data.data; // 응답의 data 필드 반환
    } catch (error) {
        throw new Error("사고 전체 조회 중 오류가 발생했습니다.");
    }
};
