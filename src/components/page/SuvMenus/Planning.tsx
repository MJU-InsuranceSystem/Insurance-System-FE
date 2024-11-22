import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import { createPlan } from '../../../api/planningApi';
import {
    Container,
    Title,
    Form,
    Label,
    Input,
    TextArea,
    Button,
    FileInput,
    ErrorText,
    LoadingSpinner,
    Select,
} from '../../styles/PlanningStyles';

const insuranceOptions = [
    { value: '화재보험', label: '화재보험' },
    { value: '자동차보험', label: '자동차보험' },
    { value: '생명보험', label: '생명보험' },
    { value: '건강보험', label: '건강보험' },
    { value: '여행보험', label: '여행보험' },
    { value: '암보험', label: '암보험' },
];

const Planning: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [plannerName, setPlannerName] = useState('');
    const [insurancePlanType, setInsurancePlanType] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const validateForm = () => {
        if (!title.trim()) {
            setError('기획 제목을 입력해주세요.');
            return false;
        }
        if (!description.trim()) {
            setError('기획 설명을 입력해주세요.');
            return false;
        }
        if (!plannerName.trim()) {
            setError('기획자 이름을 입력해주세요.');
            return false;
        }
        if (!insurancePlanType.trim()) {
            setError('보험 종류를 선택해주세요.');
            return false;
        }
        if (!file) {
            setError('파일을 업로드해주세요.');
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const planData = {
                title,
                description,
                plannerName,
                insurancePlanType,
                file: file as File,
            };

            const response = await createPlan(planData);
            console.log('API 응답 성공:', response);

            // 로컬 저장소에 새 기획 추가
            const updatedPlans = JSON.parse(localStorage.getItem('plans') || '[]');
            updatedPlans.push(response);
            localStorage.setItem('plans', JSON.stringify(updatedPlans));

            alert('기획이 성공적으로 생성되었습니다!');
            navigate('/adminHome'); // 목록 페이지로 이동
        } catch (error) {
            console.error('API 요청 실패:', error);
            setError(error instanceof Error ? error.message : '제출에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Title>기획 페이지</Title>
                <Form onSubmit={handleSubmit}>
                    {error && <ErrorText>{error}</ErrorText>}
                    <Label>기획 제목</Label>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Label>기획 설명</Label>
                    <TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Label>기획자 이름</Label>
                    <Input
                        type="text"
                        value={plannerName}
                        onChange={(e) => setPlannerName(e.target.value)}
                    />

                    <Label>보험 종류</Label>
                    <Select
                        value={insurancePlanType}
                        onChange={(e) => setInsurancePlanType(e.target.value)}
                    >
                        <option value="">보험 종류 선택</option>
                        {insuranceOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>

                    <Label>파일 업로드</Label>
                    <FileInput
                        type="file"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    />

                    <Button type="submit" disabled={loading}>
                        {loading ? <LoadingSpinner /> : '제출하기'}
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default Planning;
