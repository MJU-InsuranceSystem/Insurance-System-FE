import axiosInstance from "./axiosInstance";

// 상태값 변환 (한글로 변환)
const statusMapping: Record<string, string> = {
    APPROVED: "승인",
    REJECTED: "거부",
    PENDING: "대기",
};

/**
 * 인수 심사 요청 API
 * @param contractId - 계약 ID
 * @param approveStatus - 승인 상태 (APPROVED, REJECTED, PENDING)
 */
export const patchUnderwrite = async (contractId: number, approveStatus: string) => {
    // 한글 상태값으로 변환
    const translatedStatus = statusMapping[approveStatus] || approveStatus;

    console.log("PATCH 요청 데이터:", { approveStatus: translatedStatus });

    const response = await axiosInstance.patch(`/api/underwrite/${contractId}`, {
        approveStatus: translatedStatus,
    });

    console.log("응답 데이터:", response.data);

    if (response.data.httpStatusCode !== 200) {
        throw new Error(response.data.message || "인수 심사 요청에 실패했습니다.");
    }

    return response.data;
};
