import axiosInstance from "./axiosInstance";

export const updateLiabilityStatus = async (accidentId: number, body: { liabilityStatus: string; comments: string }) => {
    try {
        await axiosInstance.patch(`/api/accident/${accidentId}/liability`, body);
    } catch (error) {
        throw new Error("면책/부책 상태 업데이트 중 오류가 발생했습니다.");
    }
};
