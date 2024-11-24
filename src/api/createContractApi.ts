import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

export interface ContractRequest {
    contractRequestDto: {
        paymentDate: string;
        paymentMethod: string;
        paymentAccount: string;
        bank: string;
        startDate: string;
        endDate: string;
    };
    driverLicenseRequestDto: {
        licenseNumber: string;
        licenseType: string;
        issueDate: string;
        validityPeriod: string;
    };
    carRequestDto: {
        carNumber: string;
        carType: string;
        modelYear: string;
        registrationDate: string;
        ownershipStatus: string;
        accidentFreePeriod: string;
    };
}

export const createContract = async (
    insuranceId: string,
    contractData: ContractRequest
): Promise<{ customerId: string }> => {
    try {
        console.log("=== Request Debugging ===");
        console.log("Full URL:", `/api/contracts/car/${insuranceId}`);
        console.log("Headers:", {
            Authorization: axiosInstance.defaults.headers.common["Authorization"],
            "Content-Type": axiosInstance.defaults.headers["Content-Type"],
        });
        console.log("Body:", JSON.stringify(contractData, null, 2));

        const response = await axiosInstance.post(
            `/api/contracts/car/${insuranceId}`,
            contractData
        );
        console.log("계약 생성 성공:", response.data);
        return { customerId: response.data.customerId };
    } catch (error) {
        console.error("=== Response Error ===");

        if (error instanceof AxiosError) {
            console.error("Status Code:", error.response?.status || "N/A");
            console.error("Status Text:", error.response?.statusText || "N/A");
            console.error("Response Headers:", error.response?.headers || "N/A");
            console.error("Response Body:", error.response?.data || "N/A");

            throw new Error(
                error.response?.data?.message || "계약 생성에 실패했습니다."
            );
        }

        console.error("Unexpected Error:", error);
        throw new Error("알 수 없는 오류가 발생했습니다.");
    }
};
