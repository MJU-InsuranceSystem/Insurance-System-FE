import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccidentDetails, AccidentDetails } from "../../../api/getAccidentDetailsApi";
import Header from "../../../components/Header";
import {
    Container,
    Title,
    DetailsSection,
    DetailsItem,
    ErrorText,
    LoadingSpinner,
} from "../../styles/AccidentDetailsStyles";

const AccidentDetailsPage: React.FC = () => {
    const { accidentId } = useParams<{ accidentId: string }>();
    const [details, setDetails] = useState<AccidentDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!accidentId) {
                    throw new Error("유효하지 않은 사고 ID입니다.");
                }
                const data = await getAccidentDetails(Number(accidentId));
                setDetails(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "데이터를 가져오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [accidentId]);

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
            <Title>사고 상세 정보</Title>
            {details && (
                <DetailsSection>
                    <DetailsItem>제목: {details.title}</DetailsItem>
                    <DetailsItem>사고 날짜: {new Date(details.accidentDate).toLocaleString()}</DetailsItem>
                    <DetailsItem>설명: {details.description}</DetailsItem>
                    <DetailsItem>위치: {details.location}</DetailsItem>
                    <DetailsItem>손해 금액: {details.damageAmount.toLocaleString()}원</DetailsItem>
                    <DetailsItem>사고 유형: {details.accidentType}</DetailsItem>
                    <DetailsItem>고객 이름: {details.customerName}</DetailsItem>
                    <DetailsItem>책임 상태: {details.liabilityStatus}</DetailsItem>
                    <DetailsItem>생성일: {new Date(details.createdAt).toLocaleString()}</DetailsItem>
                    <DetailsItem>수정일: {new Date(details.updatedAt).toLocaleString()}</DetailsItem>
                    {details.fileUrl && (
                        <DetailsItem>
                            <a href={details.fileUrl} target="_blank" rel="noopener noreferrer">
                                첨부 파일 보기
                            </a>
                        </DetailsItem>
                    )}
                </DetailsSection>
            )}
        </Container>
    );
};

export default AccidentDetailsPage;
