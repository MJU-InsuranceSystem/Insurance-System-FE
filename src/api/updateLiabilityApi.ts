import axiosInstance from "./axiosInstance";

interface UpdateLiabilityBody {
    liabilityStatus: string;
    comments: string;
}

// 면책/부책 상태 업데이트 API 호출
export const updateLiabilityStatus = async (
    accidentId: number,
    body: UpdateLiabilityBody
): Promise<void> => {
    try {
        console.log("면책/부책 상태 업데이트 요청 데이터:", { accidentId, body });

        const response = await axiosInstance.patch(
            `/api/accident/${accidentId}/liability`,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                    // Axios 인스턴스에 이미 Bearer 토큰 포함되어 있다고 가정
                },
            }
        );

        // 서버에서 반환된 응답 상태 확인
        if (response.status !== 200) {
            console.error("서버 응답 오류:", response.data);
            throw new Error(response.data.message || "면책/부책 상태 업데이트 실패");
        }

        console.log("면책/부책 상태 업데이트 성공:", response.data);
    } catch (error) {
        console.error("면책/부책 상태 업데이트 중 오류 발생:", error);

        // 오류 처리
        if (typeof error === "object" && error !== null && "response" in error) {
            const axiosError = error as { response: { status: number; data?: { message?: string } } };
            switch (axiosError.response.status) {
                case 401:
                    throw new Error("인증되지 않은 요청입니다. 다시 로그인하세요.");
                case 403:
                    throw new Error("이 요청에 대한 권한이 없습니다.");
                default:
                    throw new Error(axiosError.response.data?.message || "서버에서 알 수 없는 오류가 발생했습니다.");
            }
        } else {
            throw new Error("면책/부책 상태 업데이트 중 네트워크 오류가 발생했습니다.");
        }
    }
};
