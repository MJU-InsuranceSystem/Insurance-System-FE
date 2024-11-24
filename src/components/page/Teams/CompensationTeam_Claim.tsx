//여기 부분에서 안돼 ㅠㅠㅠㅠ 사건 id를 어떻게 받아야될 지 모르겠어..
//선제가 요청한 바로는 사건 전체리스트 조회, 보험 청구 내역 조회로 나누래서 이 페이지는
//보험 청구 내역 조회하는 페이지야

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header";
import { updateLiabilityStatus, createClaim, LiabilityRequest, ClaimRequest } from "../../../api/claimsApi";
import {
    Container,
    Title,
    AccidentDetails,
    LiabilityForm,
    Input,
    Button,
    ErrorText,
    SuccessText,
} from "../../styles/CompensationTeamClaimStyles";

const CompensationTeam_Claim: React.FC = () => {
    const accidentId = "1"; // 임시로 사건 ID를 1로 설정
    const [liabilityStatus, setLiabilityStatus] = useState<"EXEMPT" | "LIABILITY">("EXEMPT");
    const [comments, setComments] = useState<string>("");
    const [paymentAmount, setPaymentAmount] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLiabilitySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
    
        const requestBody: LiabilityRequest = {
            liabilityStatus,
            comments,
        };
    
        try {
            await updateLiabilityStatus(accidentId, requestBody);
            setSuccess("면책/부책 판단이 완료되었습니다.");
        } catch (err) {
            setError(err.message);
        }
    };
    
    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
    
        const requestBody: ClaimRequest = {
            paymentAmount,
            comments: "보험금 지급이 승인되었습니다.",
        };
    
        try {
            await createClaim(accidentId, requestBody);
            setSuccess("보험금 지급이 완료되었습니다.");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container>
            <Header />
            <Title>사건 면책/부책 판단 및 보험금 지급</Title>
            <AccidentDetails>
                <p>사건 ID: {accidentId}</p>
            </AccidentDetails>

            <LiabilityForm onSubmit={handleLiabilitySubmit}>
                <label>
                    면책/부책:
                    <select value={liabilityStatus} onChange={(e) => setLiabilityStatus(e.target.value as "EXEMPT" | "LIABILITY")}>
                        <option value="EXEMPT">면책</option>
                        <option value="LIABILITY">부책</option>
                    </select>
                </label>
                <Input
                    type="text"
                    placeholder="댓글을 입력하세요"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
                <Button type="submit">면책/부책 판단하기</Button>
            </LiabilityForm>

            <LiabilityForm onSubmit={handlePaymentSubmit}>
                <Input
                    type="number"
                    placeholder="지급 금액을 입력하세요"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                />
                <Button type="submit">보험금 지급하기</Button>
            </LiabilityForm>

            {error && <ErrorText>{error}</ErrorText>}
            {success && <SuccessText>{success}</SuccessText>}
        </Container>
    );
};

export default CompensationTeam_Claim;
