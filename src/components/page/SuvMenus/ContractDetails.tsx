import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContractDetails, ContractDetails } from "../../../api/getContractDetailsApi";
import Header from "../../../components/Header";
import {
    Container,
    Title,
    DetailsSection,
    DetailsItem,
    LoadingSpinner,
    ErrorText,
    Button,
} from "../../styles/ContractDetailsStyles";

const ContractDetailsPage: React.FC = () => {
    const { contractId } = useParams<{ contractId: string }>();
    const navigate = useNavigate();
    const [details, setDetails] = useState<ContractDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!contractId) {
                    throw new Error("유효하지 않은 계약 ID입니다.");
                }
                const data = await getContractDetails(Number(contractId));
                setDetails(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "데이터를 가져오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [contractId]);

    const handleReviewClick = () => {
        if (!contractId) {
            setError("유효하지 않은 계약 ID입니다.");
            return;
        }
        navigate(`/contract-review/${contractId}`);
    };

    const handlePaymentHistoryClick = () => {
        if (!contractId) {
            setError("유효하지 않은 계약 ID입니다.");
            return;
        }
        navigate(`/payment-history/${contractId}`); // 납부 내역 조회 페이지로 이동
    };

    if (loading) {
        return (
            <Container>
                <Header />
                <LoadingSpinner>로딩 중...</LoadingSpinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Header />
                <ErrorText>{error}</ErrorText>
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <Title>계약 상세 정보</Title>
            {details && (
                <DetailsSection>
                    <h3>계약 정보</h3>
                    <DetailsItem>결제 날짜: {details.contractInformation.paymentDate}</DetailsItem>
                    <DetailsItem>결제 방식: {details.contractInformation.paymentMethod}</DetailsItem>
                    <DetailsItem>결제 계좌: {details.contractInformation.paymentAccount}</DetailsItem>
                    <DetailsItem>은행: {details.contractInformation.bank}</DetailsItem>
                    <DetailsItem>계약 시작일: {details.contractInformation.startDate}</DetailsItem>
                    <DetailsItem>계약 종료일: {details.contractInformation.endDate}</DetailsItem>

                    <h3>운전 면허 정보</h3>
                    <DetailsItem>면허 번호: {details.license.licenseNumber}</DetailsItem>
                    <DetailsItem>면허 유형: {details.license.licenseType}</DetailsItem>
                    <DetailsItem>발급일: {details.license.issueDate}</DetailsItem>
                    <DetailsItem>유효 기간: {details.license.validityPeriod}</DetailsItem>

                    <h3>차량 정보</h3>
                    <DetailsItem>차량 번호: {details.carInformation.carNumber}</DetailsItem>
                    <DetailsItem>차량 유형: {details.carInformation.carType}</DetailsItem>
                    <DetailsItem>모델 연도: {details.carInformation.modelYear}</DetailsItem>
                    <DetailsItem>등록일: {details.carInformation.registrationDate}</DetailsItem>
                    <DetailsItem>소유 상태: {details.carInformation.ownershipStatus}</DetailsItem>
                    <DetailsItem>무사고 기간: {details.carInformation.accidentFreePeriod}개월</DetailsItem>
                </DetailsSection>
            )}
            <Button onClick={handleReviewClick}>인수 심사</Button>
            <Button onClick={handlePaymentHistoryClick}>납부 확인 조회하기</Button> {/* 납부 내역 조회 페이지로 이동 */}
        </Container>
    );
};

export default ContractDetailsPage;
