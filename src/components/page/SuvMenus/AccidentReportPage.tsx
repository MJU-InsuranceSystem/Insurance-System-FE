import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reportAccident, AccidentReportRequest } from "../../../api/reportAccidentApi";
import Header from "../../../components/Header";
import {
    Container,
    Title,
    Form,
    Label,
    Input,
    TextArea,
    Select,
    FileInput,
    Button,
    ErrorText,
    SuccessMessage,
} from "../../styles/AccidentReportStyles";

const AccidentReportPage: React.FC = () => {
    const { contractId } = useParams<{ contractId: string }>(); // URL에서 contractId 가져오기
    const navigate = useNavigate();
    const [accidentData, setAccidentData] = useState<AccidentReportRequest>({
        title: "",
        accidentDate: "",
        description: "",
        location: "",
        damageAmount: 0,
        accidentType: "",
        file: undefined,
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setAccidentData((prev) => ({
            ...prev,
            [name]: name === "damageAmount" ? parseFloat(value) : value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setAccidentData((prev) => ({
                ...prev,
                file: files[0],
            }));
        } else {
            setAccidentData((prev) => ({
                ...prev,
                file: undefined,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!contractId) {
            setError("유효하지 않은 계약 ID입니다.");
            return;
        }

        try {
            setError(null);
            setSuccess(null);
            await reportAccident(Number(contractId), accidentData);
            setSuccess("사고가 성공적으로 접수되었습니다.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "사고 접수 중 오류가 발생했습니다.");
        }
    };

    const handleViewAllAccidents = () => {
        navigate("/accident-list"); // 사건 전체 조회 페이지로 이동
    };

    return (
        <Container>
            <Header />
            <Title>사고 접수하기</Title>
            {error && <ErrorText>{error}</ErrorText>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            <Form onSubmit={handleSubmit}>
                <Label>사고 제목</Label>
                <Input
                    type="text"
                    name="title"
                    value={accidentData.title}
                    onChange={handleChange}
                    required
                />
                <Label>사고 날짜</Label>
                <Input
                    type="datetime-local"
                    name="accidentDate"
                    value={accidentData.accidentDate}
                    onChange={handleChange}
                    required
                />
                <Label>사고 설명</Label>
                <TextArea
                    name="description"
                    value={accidentData.description}
                    onChange={handleChange}
                    required
                />
                <Label>사고 위치</Label>
                <Input
                    type="text"
                    name="location"
                    value={accidentData.location}
                    onChange={handleChange}
                    required
                />
                <Label>손해 금액</Label>
                <Input
                    type="number"
                    name="damageAmount"
                    value={accidentData.damageAmount}
                    onChange={handleChange}
                    required
                />
                <Label>사고 유형</Label>
                <Select name="accidentType" value={accidentData.accidentType} onChange={handleChange} required>
                    <option value="">선택</option>
                    <option value="자동차 사고">자동차 사고</option>
                    <option value="화재">화재</option>
                    <option value="자연재해">자연재해</option>
                    <option value="기타">기타</option>
                </Select>
                <Label>파일 첨부 (선택)</Label>
                <FileInput type="file" onChange={handleFileChange} />
                <Button type="submit">사고 접수하기</Button>
            </Form>
            <Button onClick={handleViewAllAccidents} style={{ marginTop: "20px" }}>
                사건 전체 조회하기
            </Button>
        </Container>
    );
};

export default AccidentReportPage;
