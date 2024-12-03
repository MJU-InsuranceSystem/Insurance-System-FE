import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { submitPayment } from "../../../api/paymentApi";
import { getAllContracts, Contract } from "../../../api/getAllContractsApi"; // 추가된 import
import Header from "../../../components/Header";
import {
    Container,
    Title,
    Form,
    Label,
    Input,
    Button,
    ErrorText,
    SuccessMessage,
} from "../../styles/PaymentSubmissionStyles";

const PaymentSubmissionPage: React.FC = () => {
    const { contractId } = useParams<{ contractId: string }>();
    const [contract, setContract] = useState<Contract | null>(null);
    const [amount, setAmount] = useState<number | "">("");
    const [paymentDate, setPaymentDate] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchContract = async () => {
            try {
                const contracts = await getAllContracts();
                const foundContract = contracts.find(c => c.contractId.toString() === contractId);
                
                if (foundContract) {
                    setContract(foundContract);
                } else {
                    setError("계약 ID에 해당하는 계약을 찾을 수 없습니다.");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "계약 정보를 가져오는 중 오류가 발생했습니다.");
            }
        };

        fetchContract();
    }, [contractId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!contractId) {
            setError("유효하지 않은 계약 ID입니다.");
            return;
        }

        if (!amount || !paymentDate || !dueDate) {
            setError("모든 필드를 입력해주세요.");
            return;
        }

        try {
            setError(null);
            setSuccess(null);

            const paymentData = {
                amount: Number(amount),
                paymentDate,
                dueDate,
            };

            console.log("=== 보험금 납부 API 요청 ===");
            console.log("Contract ID:", contractId);
            console.log("Request Data:", JSON.stringify(paymentData, null, 2));

            const response = await submitPayment(contractId, paymentData);

            console.log("=== API 요청 성공 ===");
            console.log("Response:", response);

            setSuccess(response.message || "납부가 성공적으로 처리되었습니다!");
        } catch (error: unknown) {
            console.error("=== API 요청 실패 ===");
            if (error instanceof Error) {
                console.error("Error Message:", error.message);
                setError(error.message || "납부 처리 중 오류가 발생했습니다.");
            } else {
                setError("알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    return (
        <Container>
            <Header />
            <Title>{contract ? `계약 ID ${contract.contractId} 보험금 납부하기` : "보험금 납부하기"}</Title>
            {error && <ErrorText>{error}</ErrorText>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            <Form onSubmit={handleSubmit}>
                <Label>납부 금액</Label>
                <Input
                    type="number"
                    placeholder="납부 금액을 입력하세요"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                />
                <Label>납부 날짜</Label>
                <Input
                    type="datetime-local"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                />
                <Label>납부 기한</Label>
                <Input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <Button type="submit">납부하기</Button>
            </Form>
        </Container>
    );
};

export default PaymentSubmissionPage;
