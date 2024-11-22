import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import Header from '../../Header';
import {
    Container,
    Title,
    InsuranceDetailContainer,
    DetailItem,
    LoadingSpinner,
    ErrorText,
    Button,
} from '../../styles/InsuranceDetailStyles';

// InsuranceDetail 데이터 타입 정의
interface InsuranceDetail {
    name: string;
    description: string;
    eligibleAgeMin: number;
    eligibleAgeMax: number;
    coverageRange: string;
    coverageAmountMax: number | null;
    duration: number;
    exclusions: string;
    monthlyPremium: number | null;
    salesStartDate: string;
    salesEndDate: string;
    saleTarget: string;
    insuranceType: string;
    workerName: string;
}

const InsuranceDetail: React.FC = () => {
    const { insuranceId } = useParams<{ insuranceId: string }>(); // URL에서 insuranceId 가져오기
    const [insuranceDetail, setInsuranceDetail] = useState<InsuranceDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // 보험 상세 데이터를 가져오는 함수
    useEffect(() => {
        const fetchInsuranceDetail = async () => {
            if (!insuranceId) {
                setError('유효하지 않은 보험 ID입니다.');
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await axiosInstance.get(`/api/insurances/${insuranceId}`);
                const data = response.data?.data;
                if (!data) {
                    throw new Error('유효하지 않은 응답 데이터 구조');
                }
                setInsuranceDetail(data);
            } catch (err) {
                console.error('보험 상세 정보를 가져오는 중 오류 발생:', err);
                setError('보험 상세 정보를 가져오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchInsuranceDetail();
    }, [insuranceId]);

    // 계약하기 버튼 클릭 시 호출
    const handleGoToContractPage = () => {
        navigate(`/createContract/${insuranceId}`);
    };

    // 로딩 중 화면
    if (loading) {
        return (
            <Container>
                <Header />
                <LoadingSpinner>로딩 중...</LoadingSpinner>
            </Container>
        );
    }

    // 에러 발생 시 화면
    if (error) {
        return (
            <Container>
                <Header />
                <ErrorText>{error}</ErrorText>
            </Container>
        );
    }

    // 데이터가 정상적으로 로드된 경우 화면
    return (
        <Container>
            <Header />
            <Title>보험 상세 정보</Title>
            {insuranceDetail && (
                <InsuranceDetailContainer>
                    <DetailItem><span>이름:</span> {insuranceDetail.name}</DetailItem>
                    <DetailItem><span>설명:</span> {insuranceDetail.description}</DetailItem>
                    <DetailItem>
                        <span>가입 가능 연령:</span> {insuranceDetail.eligibleAgeMin} ~ {insuranceDetail.eligibleAgeMax}세
                    </DetailItem>
                    <DetailItem><span>보장 범위:</span> {insuranceDetail.coverageRange}</DetailItem>
                    <DetailItem>
                        <span>최대 보장 금액:</span>{' '}
                        {insuranceDetail.coverageAmountMax !== null
                            ? `${insuranceDetail.coverageAmountMax.toLocaleString()}원`
                            : '정보 없음'}
                    </DetailItem>
                    <DetailItem>
                        <span>보험료:</span>{' '}
                        {insuranceDetail.monthlyPremium !== null
                            ? `${insuranceDetail.monthlyPremium.toLocaleString()}원`
                            : '정보 없음'}
                    </DetailItem>
                    <DetailItem>
                        <span>판매 기간:</span> {insuranceDetail.salesStartDate} ~ {insuranceDetail.salesEndDate}
                    </DetailItem>
                    <DetailItem><span>제외 조건:</span> {insuranceDetail.exclusions}</DetailItem>
                    <DetailItem><span>보험 유형:</span> {insuranceDetail.insuranceType}</DetailItem>
                    <DetailItem><span>담당자:</span> {insuranceDetail.workerName}</DetailItem>
                    <Button onClick={handleGoToContractPage}>계약하기</Button>
                </InsuranceDetailContainer>
            )}
        </Container>
    );
};

export default InsuranceDetail;
