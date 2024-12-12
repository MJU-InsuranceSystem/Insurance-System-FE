import React, { useEffect, useState } from 'react';
import { fetchAllClaims, Claim } from '../../../api/viewpayClaimAllApi';
import Header from '../../AdminHeader';
import {
    Container,
    Title,
    Table,
    ErrorText,
    LoadingSpinner,
} from '../../styles/CompensationTeamClaimStyles'; // 스타일 import

const CompensationTeamClaim: React.FC = () => {
    const [claims, setClaims] = useState<Claim[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadClaims = async () => {
            try {
                const data = await fetchAllClaims();
                setClaims(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("알 수 없는 오류가 발생했습니다.");
                }
            } finally {
                setLoading(false);
            }
        };

        loadClaims();
    }, []);

    if (loading) return <LoadingSpinner>로딩 중...</LoadingSpinner>;
    if (error) return <ErrorText>오류 발생: {error}</ErrorText>;

    return (
        <Container>
            <Header />
            <Title>보험금 지급 내역</Title>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>사건 제목</th>
                        <th>지급자</th>
                        <th>지급 금액</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                {claims.map(claim => (
                        <tr key={claim.id}>
                            <td>{claim.id}</td>
                            <td>{claim.accidentTitle}</td>
                            <td>{claim.payerName}</td>
                            <td>{claim.paymentAmount}</td>
                            <td>{claim.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default CompensationTeamClaim;
