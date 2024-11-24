import axiosInstance from "./axiosInstance";

export interface AccidentDetails {
    id: number;
    title: string;
    accidentDate: string;
    description: string;
    location: string;
    damageAmount: number;
    fileUrl: string;
    accidentType: string;
    customerName: string;
    liabilityStatus: string;
    createdAt: string;
    updatedAt: string;
}

export const getAccidentDetails = async (accidentId: number): Promise<AccidentDetails> => {
    try {
        const response = await axiosInstance.get(`/api/accidents/${accidentId}`);
        return response.data.data;
    } catch (error) {
        throw new Error("사고 상세 정보를 가져오는 중 오류가 발생했습니다.");
    }
};
