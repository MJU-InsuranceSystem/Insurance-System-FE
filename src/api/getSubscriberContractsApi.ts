import axiosInstance from './axiosInstance';

export interface ContractInformation {
    paymentDate: number;
    paymentMethod: string;
    paymentAccount: string;
    bank: string;
    startDate: string;
    endDate: string;
}

export interface Contract {
    contractId: number;
    approveStatus: string;
    contractInformation: ContractInformation;
}

export const getSubscriberContracts = async (subscriberId: string): Promise<Contract[]> => {
    try {
        const response = await axiosInstance.get(`/api/contracts/subscribers/${subscriberId}`);
        console.log('API 응답 데이터:', response.data);
        return response.data.data; // 계약 정보 배열 반환
    } catch (error) {
        console.error('고객 계약 조회 API 호출 중 오류 발생:', error);
        throw new Error('고객 계약 정보를 가져오는 데 실패했습니다.');
    }
};
