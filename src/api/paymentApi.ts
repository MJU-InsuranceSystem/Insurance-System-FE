import axiosInstance from "./axiosInstance";

interface PaymentRequest {
    amount: number;
    paymentDate: string;
    dueDate: string;
}

interface ApiResponse {
    httpStatusCode: number;
    message: string;
    resultType: string;
    responseCode: string;
}

export const submitPayment = async (
    contractId: string,
    paymentData: PaymentRequest
): Promise<ApiResponse> => {
    const url = `/api/payments/contracts/${contractId}`;

    try {
        console.log("=== Request Sent ===");
        console.log("Full URL:", url);
        console.log("Method:", "POST");
        console.log("Headers:", axiosInstance.defaults.headers.common);
        console.log("Body:", paymentData);

        const response = await axiosInstance.post<ApiResponse>(url, paymentData);

        console.log("=== Response Received ===");
        console.log("Status:", response.status);
        console.log("Data:", response.data);

        return response.data;
    } catch (error: any) {
        console.error("=== Response Error ===");

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Headers:", error.response.headers);
            console.error("Data:", error.response.data);

            throw new Error(
                error.response.data.message || "납부 요청 중 문제가 발생했습니다."
            );
        } else {
            console.error("Unexpected Error:", error);
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
    }
};
