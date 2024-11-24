import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaymentHistory, PaymentHistory } from "../../../api/getPaymentHistoryApi";
import Header from "../../../components/Header";
import {
    Container,
    Title,
    PaymentList,
    PaymentItem,
    LoadingSpinner,
    ErrorText,
} from "../../styles/PaymentHistoryStyles";

const PaymentHistoryPage: React.FC = () => {
    const { contractId } = useParams<{ contractId: string }>();
    const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!contractId) {
                    throw new Error("유효하지 않은 계약 ID입니다.");
                }
                const data = await getPaymentHistory(Number(contractId));
                setPaymentHistory(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "데이터를 가져오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, [contractId]);

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
            <Title>납부 내역 조회</Title>
            <PaymentList>
                {paymentHistory.length > 0 ? (
                    paymentHistory.map((payment) => (
                        <PaymentItem key={payment.id}>
                            <p>납부 금액: {payment.amount.toFixed(2)} 원</p>
                            <p>납부일: {new Date(payment.paymentDate).toLocaleString()}</p>
                            <p>마감일: {new Date(payment.dueDate).toLocaleString()}</p>
                            <p>납부 방식: {payment.paymentMethod}</p>
                        </PaymentItem>
                    ))
                ) : (
                    <p>납부 내역이 없습니다.</p>
                )}
            </PaymentList>
        </Container>
    );
};

export default PaymentHistoryPage;
