import axiosInstance from "./axiosInstance";

interface AccountInfo {
    bankName: string;
    accountNumber: string;
    balance: number;
}

interface ApiResponse {
    httpStatusCode: number;
    message: string;
    resultType: string;
    responseCode: string;
}

export const postAccountInfo = async (accountData: AccountInfo): Promise<ApiResponse> => {
    const url = `/api/users/accounts`;

    try {
        console.log("API 호출 시작:", url);
        console.log("요청 데이터:", accountData);

        const response = await axiosInstance.post<ApiResponse>(url, accountData);

        console.log("HTTP 상태 코드:", response.status);
        console.log("API 성공 응답:", response.data);

        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("HTTP 상태 코드:", error.response.status);
            console.error("API 오류 응답:", error.response.data);

            throw new Error(
                error.response.data.message || "계좌 정보 등록 중 문제가 발생했습니다."
            );
        } else {
            console.error("알 수 없는 오류:", error);
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
    }
};
