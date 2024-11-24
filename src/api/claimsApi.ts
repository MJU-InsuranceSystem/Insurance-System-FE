//아마 이 api 응용할 수 있을 것 같은데 해당 페이지에서는 작동이 안돼...
export interface LiabilityRequest {
    liabilityStatus: "EXEMPT" | "LIABILITY"; // 면책 또는 부책
    comments: string;
}

export interface ClaimRequest {
    paymentAmount: string; // 지급 금액
    comments: string; // 지급 이유
}

/**
 * 면책/부책 판단 API 호출
 * @param accidentId - 사건 ID
 * @param requestBody - 면책/부책 요청 본문
 * @returns Promise<void>
 */
export const updateLiabilityStatus = async (accidentId: string, requestBody: LiabilityRequest): Promise<void> => {
    const response = await fetch(`http://localhost:8080/api/accident/${accidentId}/liability`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error("면책/부책 판단 중 오류가 발생했습니다.");
    }
};

/**
 * 보험금 지급 API 호출
 * @param accidentId - 사건 ID
 * @param requestBody - 보험금 지급 요청 본문
 * @returns Promise<void>
 */
export const createClaim = async (accidentId: string, requestBody: ClaimRequest): Promise<void> => {
    const response = await fetch(`http://localhost:8080/api/accidents/${accidentId}/claims`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error("보험금 지급 중 오류가 발생했습니다.");
    }
};
