import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAccidents, Accident } from "../../../api/getAllAccidentsApi";
import { updateLiabilityStatus } from "../../../api/updateLiabilityApi";
import { payClaim } from "../../../api/payClaimApi";
import Header from "../../Header";
import {
    Container,
    Title,
    AccidentList,
    AccidentItem,
    AccidentDetails,
    ErrorText,
    LoadingSpinner,
    Button,
} from "../../styles/CompensationTeamAccidentStyles";

const CompensationTeam_Accident: React.FC = () => {
    const [accidents, setAccidents] = useState<Accident[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccidents = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getAllAccidents();
                setAccidents(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError("사건 목록을 가져오는 중 오류가 발생했습니다: " + error.message);
                } else {
                    setError("사건 목록을 가져오는 중 알 수 없는 오류가 발생했습니다.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAccidents();
    }, []);

    const handleViewDetails = (accidentId: number) => {
        navigate(`/accidents/details/${accidentId}`);
    };

    const handleLiabilityUpdate = async (accidentId: number, status: string) => {
        try {
            await updateLiabilityStatus(accidentId, {
                liabilityStatus: status,
                comments: "사건에 대한 면책/부책 판단",
            });

            setAccidents((prev) =>
                prev.map((accident) =>
                    accident.id === accidentId ? { ...accident, liabilityStatus: status } : accident
                )
            );

            alert(`사건 ${accidentId}의 면책/부책 상태가 "${status === "면책" ? "면책" : "부책"}"으로 업데이트되었습니다.`);
        } catch (error) {
            if (error instanceof Error) {
                alert(`오류: ${error.message}`); // 사용자에게 한글 메시지로 표시
            } else {
                alert("면책/부책 상태 업데이트 중 알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    const handleClaimPayment = async (accidentId: number) => {
        const paymentAmount = prompt("지급할 금액을 입력하세요:");
        const comments = prompt("지급 사유를 입력하세요:");

        if (paymentAmount && comments) {
            try {
                await payClaim(accidentId, { paymentAmount, comments });
                alert("보험금 지급이 완료되었습니다.");
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                } else {
                    alert("보험금 지급 중 알 수 없는 오류가 발생했습니다.");
                }
            }
        } else {
            alert("지급 금액과 사유를 모두 입력해야 합니다.");
        }
    };

    if (loading) {
        return (
            <Container>
                <Header />
                <LoadingSpinner>로딩 중...</LoadingSpinner>
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <Title>사건 전체 리스트</Title>
            {error && <ErrorText>{error}</ErrorText>}
            <AccidentList>
                {accidents.map((accident) => (
                    <AccidentItem key={accident.id}>
                        <AccidentDetails onClick={() => handleViewDetails(accident.id)}>
                            <p>
                                <b>제목:</b> {accident.title}
                            </p>
                            <p>
                                <b>사고 날짜:</b> {new Date(accident.accidentDate).toLocaleString()}
                            </p>
                        </AccidentDetails>
                        <Button onClick={() => handleLiabilityUpdate(accident.id, "면책")}>
                            면책으로 판단하기
                        </Button>
                        <Button onClick={() => handleLiabilityUpdate(accident.id, "부책")}>
                            부책으로 판단하기
                        </Button>
                        <Button onClick={() => handleClaimPayment(accident.id)}>보험금 지급하기</Button>
                    </AccidentItem>
                ))}
            </AccidentList>
        </Container>
    );
};

export default CompensationTeam_Accident;
