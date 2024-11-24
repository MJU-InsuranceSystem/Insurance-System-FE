import axiosInstance from './axiosInstance';

// 납부 내역 타입 정의
export interface PaymentHistory {
    id: number;
    amount: number;
    paymentDate: string;
    dueDate: string;
    paymentMethod: string;
}

// 납부 내역 조회 함수
export const getPaymentHistory = async (contractId: number): Promise<PaymentHistory[]> => {
    try {
        const response = await axiosInstance.get(`/api/payments/contracts/${contractId}`);
        return response.data.data;
    } catch (error) {
        throw new Error("납부 내역을 가져오는 중 오류가 발생했습니다.");
    }
};
