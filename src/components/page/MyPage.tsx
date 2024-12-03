import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubscriberContracts, Contract } from "../../api/getSubscriberContractsApi";
import {
    Container,
    Title,
    ContractList,
    ContractItem,
    ContractDetails,
    ErrorText,
    LoadingSpinner,
    StatusText,
} from "../styles/MyPageStyles";
import Header from "../../components/Header";

const MyPage: React.FC = () => {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContracts = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getSubscriberContracts();
                setContracts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "데이터를 가져오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchContracts();
    }, []);

    const handleDoubleClick = (contractId: number) => {
        navigate(`/contracts/details/client/${contractId}`); // 고객일 때 고객 전용 계약 상세 정보로 이동하게
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
            <Title>고객 계약 내역</Title>
            <ContractList>
                {contracts.length > 0 ? (
                    contracts.map((contract) => (
                        <ContractItem
                            key={contract.contractId}
                            onDoubleClick={() => handleDoubleClick(contract.contractId)}
                        >
                            <ContractDetails>
                                <p>
                                    승인 상태: 
                                    <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>
                                        <StatusText approveStatus={contract.approveStatus}>
                                            {contract.approveStatus}
                                        </StatusText>
                                    </span>
                                </p>
                                <p>결제 날짜: {contract.contractInformation.paymentDate}일</p>
                                <p>결제 방식: {contract.contractInformation.paymentMethod}</p>
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
