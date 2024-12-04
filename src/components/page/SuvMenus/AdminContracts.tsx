import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllContracts, Contract } from "../../../api/getAllContractsApi";
import Header from "../../../components/AdminHeader";
import {
    Container,
    Title,
    ContractList,
    ContractItem,
    ContractDetails,
    LoadingSpinner,
    ErrorText,
    StatusText,
} from "../../styles/AdminContractsStyles";

const AdminContracts: React.FC = () => {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContracts = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getAllContracts();
                setContracts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "데이터를 가져오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchContracts();
    }, []);

    const handleViewDetails = (contractId: number) => {
        navigate(`/contracts/details/${contractId}`);
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
            <Title>계약 전체 내역</Title>
            <ContractList>
                {contracts.length > 0 ? (
                    contracts.map((contract) => (
                        <ContractItem
                            key={contract.contractId}
                            onClick={() => handleViewDetails(contract.contractId)}
                        >
                            <ContractDetails>
                                <p>보험 이름: {contract.insuranceName}</p> {/* 보험 이름 추가 */}
                                <p style={{ display: 'flex', alignItems: 'center' }}>
                                    승인 상태: 
                                    <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>
                                        <StatusText approveStatus={contract.approveStatus}>
                                            {contract.approveStatus}
                                        </StatusText>
                                    </span>
                                </p>
                                <p>결제 방식: {contract.contractInformation.paymentMethod}</p>
                                <p>계약 기간: {contract.contractInformation.startDate} ~ {contract.contractInformation.endDate}</p>
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

export default AdminContracts;
