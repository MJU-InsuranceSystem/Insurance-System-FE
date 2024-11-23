import React, { useEffect, useState } from 'react';
import { getSubscriberContracts, Contract } from '../../api/getSubscriberContractsApi';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import {
    Container,
    Title,
    ContractList,
    ContractItem,
    ContractDetails,
    ErrorText,
    LoadingSpinner,
} from '../styles/MyPageStyles';

const MyPage: React.FC = () => {
    const { subscriberId } = useParams<{ subscriberId: string }>();
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContracts = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!subscriberId) {
                    throw new Error('유효하지 않은 고객 ID입니다.');
                }

                const data = await getSubscriberContracts(subscriberId);
                setContracts(data);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : '데이터를 가져오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchContracts();
    }, [subscriberId]);

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
            <Title>고객 계약 내역</Title>
            <ContractList>
                {contracts.length > 0 ? (
                    contracts.map((contract) => (
                        <ContractItem key={contract.contractId}>
                            <h3>계약 ID: {contract.contractId}</h3>
                            <ContractDetails>
                                <p>승인 상태: {contract.approveStatus}</p>
                                <p>결제 날짜: {contract.contractInformation.paymentDate}</p>
                                <p>결제 방식: {contract.contractInformation.paymentMethod}</p>
                                <p>결제 계좌: {contract.contractInformation.paymentAccount}</p>
                                <p>은행: {contract.contractInformation.bank}</p>
                                <p>계약 시작일: {contract.contractInformation.startDate}</p>
                                <p>계약 종료일: {contract.contractInformation.endDate}</p>
                            </ContractDetails>
                        </ContractItem>
                    ))
                ) : (
                    <p>계약 내역이 없습니다.</p>
                )}
            </ContractList>
        </Container>
    );
};

export default MyPage;
