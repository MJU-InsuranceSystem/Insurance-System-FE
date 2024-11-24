import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { patchUnderwrite } from "../../../api/underWriteApi";
import Header from "../../../components/Header";
import {
    Container,
    Title,
    Form,
    Select,
    Option,
    Button,
    SuccessMessage,
    ErrorMessage,
} from "../../styles/ContractReviewStyles";

const ContractReviewPage: React.FC = () => {
    const { contractId } = useParams<{ contractId: string }>();
    const navigate = useNavigate();
    const [approveStatus, setApproveStatus] = useState<string>("PENDING");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!contractId) {
            setErrorMessage("유효하지 않은 계약 ID입니다.");
            return;
        }

        try {
            const result = await patchUnderwrite(Number(contractId), approveStatus);

            setSuccessMessage(result.message);
            setErrorMessage(null);

            // 성공 시 계약 상세 페이지로 이동
            setTimeout(() => navigate(`/contracts/details/${contractId}`), 2000);
        } catch (error: any) {
            setErrorMessage(error.message || "인수 심사 처리 중 오류가 발생했습니다.");
            setSuccessMessage(null);
        }
    };

    return (
        <Container>
            <Header />
            <Title>인수 심사</Title>
            <Form>
                <label htmlFor="approveStatus">상태 선택</label>
                <Select
                    id="approveStatus"
                    value={approveStatus}
                    onChange={(e) => setApproveStatus(e.target.value)}
                >
                    <Option value="APPROVED">승인</Option>
                    <Option value="REJECTED">거부</Option>
                    <Option value="PENDING">대기</Option>
                </Select>
                <Button onClick={handleSubmit}>저장</Button>
            </Form>
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Container>
    );
};

export default ContractReviewPage;
