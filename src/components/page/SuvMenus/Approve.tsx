import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import { approvePlan } from '../../../api/approveApi';
import {
    Container,
    Title,
    Form,
    Label,
    Input,
    TextArea,
    Button,
    Select,
    ErrorText,
    LoadingSpinner,
} from '../../styles/ApproveStyles';

const reviewOptions = [
    { value: 'APPROVE', label: '승인' },
    { value: 'REJECTED', label: '거부' },
];

const Approve: React.FC = () => {
    const [planId, setPlanId] = useState('');
    const [reviewResult, setReviewResult] = useState('');
    const [comments, setComments] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const validateForm = () => {
        if (!planId.trim()) {
            setError('Plan ID를 입력해주세요.');
            return false;
        }
        if (!reviewResult.trim()) {
            setError('리뷰 결과를 선택해주세요.');
            return false;
        }
        if (!comments.trim()) {
            setError('코멘트를 입력해주세요.');
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
            await approvePlan(planId, { reviewResult: reviewResult as 'APPROVE' | 'REJECTED', comments });
            alert('상품 승인/거부가 성공적으로 처리되었습니다.');
            navigate('/adminHome');
        } catch (error) {
            console.error('상품 승인 실패:', error);
            setError(error instanceof Error ? error.message : '상품 승인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Title>상품 허가</Title>
                <Form onSubmit={handleSubmit}>
                    {error && <ErrorText>{error}</ErrorText>}

                    <Label>Plan ID</Label>
                    <Input
                        type="text"
                        value={planId}
                        onChange={(e) => setPlanId(e.target.value)}
                        placeholder="Plan ID를 입력하세요"
                    />

                    <Label>리뷰 결과</Label>
                    <Select
                        value={reviewResult}
                        onChange={(e) => setReviewResult(e.target.value)}
                    >
                        <option value="">리뷰 결과 선택</option>
                        {reviewOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>

                    <Label>코멘트</Label>
                    <TextArea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="승인 또는 거부 사유를 입력하세요"
                    />

                    <Button type="submit" disabled={loading}>
                        {loading ? <LoadingSpinner /> : '제출하기'}
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default Approve;
