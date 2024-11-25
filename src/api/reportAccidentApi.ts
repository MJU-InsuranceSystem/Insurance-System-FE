import axiosInstance from "./axiosInstance";

// 사고 접수 요청 타입 정의
export interface AccidentReportRequest {
    title: string;
    accidentDate: string;
    description: string;
    location: string;
    damageAmount: number;
    accidentType: string;
    file?: File;
}

// 사고 접수 API 함수
export const reportAccident = async (
    contractId: number,
    accidentData: AccidentReportRequest
): Promise<void> => {
    const formData = new FormData();
    formData.append("title", accidentData.title);
    formData.append("accidentDate", accidentData.accidentDate);
    formData.append("description", accidentData.description);
    formData.append("location", accidentData.location);
    formData.append("damageAmount", accidentData.damageAmount.toFixed(2));
    formData.append("accidentType", accidentData.accidentType);
    if (accidentData.file) {
        formData.append("file", accidentData.file);
    }

    try {
        const response = await axiosInstance.post(
            `/api/accidents/contracts/${contractId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.status !== 200) {
            throw new Error(response.data.message || "사고 접수에 실패했습니다.");
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("사고 접수 중 오류 발생:", err.message);
            throw new Error(err.message);
        } else {
            console.error("알 수 없는 오류 발생");
            throw new Error("사고 접수에 실패했습니다. 다시 시도해주세요.");
        }
    }
};
