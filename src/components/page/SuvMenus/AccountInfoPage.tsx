import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAccountInfo } from "../../../api/accountApi";
import {
    Container,
    Title,
    Form,
    Label,
    Input,
    Button,
    ErrorText,
    SuccessMessage,
} from "../../styles/AccountInfoStyles";

const AccountInfoPage: React.FC = () => {
    const navigate = useNavigate();

    const [bankName, setBankName] = useState<string>("");
    const [accountNumber, setAccountNumber] = useState<string>("");
    const [balance, setBalance] = useState<number | "">("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!bankName || !accountNumber || balance === "") {
            setError("모든 필드를 입력해주세요.");
            return;
        }

        try {
            setError(null);
            setSuccess(null);

            const accountData = {
                bankName,
                accountNumber,
                balance: Number(balance),
            };

            console.log("=== 계좌정보 API 요청 ===");
            console.log("Request Data:", JSON.stringify(accountData, null, 2));

            const response = await postAccountInfo(accountData);

            console.log("=== API 요청 성공 ===");
            console.log("Response:", response);

            setSuccess(response.message || "계좌 정보가 성공적으로 등록되었습니다!");
            navigate("/"); // 성공 시 메인 페이지로 이동 (필요 시 경로 변경 가능)
        } catch (error: unknown) {
            console.error("=== API 요청 실패 ===");
            if (error instanceof Error) {
                console.error("Error Message:", error.message);
                setError(error.message || "계좌 정보 등록 중 오류가 발생했습니다.");
            } else {
                setError("알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    return (
        <Container>
            <Title>계좌정보 입력하기</Title>
            {error && <ErrorText>{error}</ErrorText>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            <Form onSubmit={handleSubmit}>
                <Label>은행 이름</Label>
                <Input
                    type="text"
                    placeholder="은행 이름을 입력하세요"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                />
                <Label>계좌 번호</Label>
                <Input
                    type="text"
                    placeholder="계좌 번호를 입력하세요"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                />
                <Label>잔액</Label>
                <Input
                    type="number"
                    placeholder="잔액을 입력하세요"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value === "" ? "" : Number(e.target.value))}
                />
                <Button type="submit">계좌정보 등록</Button>
            </Form>
        </Container>
    );
};

export default AccountInfoPage;
