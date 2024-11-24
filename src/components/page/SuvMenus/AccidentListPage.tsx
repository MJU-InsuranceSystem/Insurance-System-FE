import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAccidents, Accident } from "../../../api/getAllAccidentsApi";
import Header from "../../../components/Header";
import {
    Container,
    Title,
    AccidentList,
    AccidentItem,
    AccidentDetails,
    LoadingSpinner,
    ErrorText,
} from "../../styles/AccidentListStyles";

const AccidentListPage: React.FC = () => {
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
            } catch {
                setError("데이터를 가져오는 중 오류가 발생했습니다."); // `err` 제거
            } finally {
                setLoading(false);
            }
        };

        fetchAccidents();
    }, []);

    const handleDoubleClick = (accidentId: number) => {
        if (!accidentId) {
            setError("유효하지 않은 사고 ID입니다.");
            return;
        }

        try {
            navigate(`/accidents/details/${accidentId}`);
        } catch {
            setError("페이지 이동 중 문제가 발생했습니다.");
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
            <Title>사고 전체 조회</Title>
            <AccidentList>
                {accidents.length > 0 ? (
                    accidents.map((accident) => (
                        <AccidentItem
                            key={accident.id}
                            onDoubleClick={() => handleDoubleClick(accident.id)}
                        >
                            <AccidentDetails>
                                <p><b>제목:</b> {accident.title}</p>
                                <p><b>사고 날짜:</b> {new Date(accident.accidentDate).toLocaleString()}</p>
                                <p><b>손해 금액:</b> {accident.damageAmount.toLocaleString()}원</p>
                                <p><b>사고 유형:</b> {accident.accidentType}</p>
                                <p><b>책임 상태:</b> {accident.liabilityStatus}</p>
                            </AccidentDetails>
                        </AccidentItem>
                    ))
                ) : (
                    <p>사고 내역이 없습니다.</p>
                )}
            </AccidentList>
        </Container>
    );
};

export default AccidentListPage;
