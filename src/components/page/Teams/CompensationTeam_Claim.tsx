import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
    const { accidentId } = useParams<{ accidentId: string }>(); // URL에서 사건 ID를 동적으로 가져옴
    const [liabilityStatus, setLiabilityStatus] = useState<"면책" | "부책">("면책");
    const [comments, setComments] = useState<string>("");
    const [paymentAmount, setPaymentAmount] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleLiabilitySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!accidentId) {
            setError("사건 ID를 찾을 수 없습니다.");
            return;
        }

        const requestBody: LiabilityRequest = {
            liabilityStatus,
            comments,
        };

        try {
            await updateLiabilityStatus(accidentId, requestBody);
            setSuccess("면책/부책 판단이 완료되었습니다.");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("면책/부책 판단 중 알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!accidentId) {
            setError("사건 ID를 찾을 수 없습니다.");
            return;
        }

        const requestBody: ClaimRequest = {
            paymentAmount,
            comments: "보험금 지급이 승인되었습니다.",
        };

        try {
            await createClaim(accidentId, requestBody);
            setSuccess("보험금 지급이 완료되었습니다.");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("보험금 지급 중 알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    return (
        <Container>
            <Header />
            <Title>사건 면책/부책 판단 및 보험금 지급</Title>
            {accidentId ? (
                <AccidentDetails>
                    <p>사건 ID: {accidentId}</p>
                </AccidentDetails>
            ) : (
                <ErrorText>사건 ID를 찾을 수 없습니다.</ErrorText>
            )}

            <LiabilityForm onSubmit={handleLiabilitySubmit}>
                <label>
                    면책/부책:
                    <select value={liabilityStatus} onChange={(e) => setLiabilityStatus(e.target.value as "면책" | "부책")}>
                        <option value="면책">면책</option>
                        <option value="부책">부책</option>
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
