import axiosInstance from "./axiosInstance";

export const payClaim = async (accidentId: number, body: { paymentAmount: string; comments: string }) => {
    try {
        await axiosInstance.post(`/api/accidents/${accidentId}/claims`, body);
    } catch (error) {
        throw new Error("보험금 지급 중 오류가 발생했습니다.");
    }
};
