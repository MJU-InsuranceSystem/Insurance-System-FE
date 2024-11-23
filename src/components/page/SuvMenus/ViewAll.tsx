import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInsurancePlans, InsurancePlan } from '../../../api/viewAllApi';
import Header from '../../Header';
import { approvePlan } from '../../../api/approveApi';
import {
    Container,
    Title,
    PlanList,
    PlanItem,
    PlanTitle,
    PlanDetails,
    ErrorText,
    LoadingSpinner,
    Button,
    Select,
    Textarea,
} from '../../styles/ViewAllStyles';

const ViewAll: React.FC = () => {
    const [plans, setPlans] = useState<InsurancePlan[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reviewResult, setReviewResult] = useState<{ [key: string]: 'APPROVED' | 'REJECTED' }>({});
    const [comments, setComments] = useState<{ [key: string]: string }>({});

    const REVIEW_RESULT_KEY = 'reviewResult';
    const navigate = useNavigate();

    // 플랜 목록 가져오기
    useEffect(() => {
        const fetchPlans = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getInsurancePlans();
                setPlans(data);

                // 로컬 스토리지에서 검토 결과 복원
                const savedReviewResult = localStorage.getItem(REVIEW_RESULT_KEY);
                if (savedReviewResult) {
                    setReviewResult(JSON.parse(savedReviewResult));
                }
            } catch {
                setError('데이터를 가져오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    // 승인/거부 처리
    const handleApprove = async (planId: string) => {
        const result = reviewResult[planId] || 'APPROVED';
        const comment = comments[planId] || '';

        try {
            await approvePlan(planId, result, comment);

            // 검토 결과 상태 업데이트
            const updatedReviewResult = { ...reviewResult, [planId]: result };
            localStorage.setItem(REVIEW_RESULT_KEY, JSON.stringify(updatedReviewResult));
            setReviewResult(updatedReviewResult);

            // 플랜 상태 업데이트
            const updatedPlans = plans.map((plan) =>
                plan.id === planId ? { ...plan, reviewStatus: result } : plan
            );
            setPlans(updatedPlans);
        } catch {
            alert('승인 요청에 실패했습니다.');
        }
    };

    // 보험 상품 생성 페이지로 이동
    const handleNavigateToCreateProduct = (planId: string) => {
        navigate(`/createProduct?planId=${planId}`);
    };

    // 로딩 화면 처리
    if (loading) {
        return (
            <Container>
                <Header />
                <LoadingSpinner />
            </Container>
        );
    }

    // 에러 화면 처리
    if (error) {
        return (
            <Container>
                <Header />
                <ErrorText>{error}</ErrorText>
            </Container>
        );
    }

    // 플랜이 없는 경우
    if (!plans.length) {
        return (
            <Container>
                <Header />
                <ErrorText>플랜이 없습니다.</ErrorText>
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <Title>보험 플랜 목록</Title>
            <PlanList>
                {plans.map((plan) => (
                    <PlanItem key={plan.id}>
                        <PlanTitle>{plan.title}</PlanTitle>
                        <PlanDetails>
                            <p>유형: {plan.insurancePlanType}</p>
                            <p>기획자: {plan.plannerName}</p>
                            <p>설명: {plan.description}</p>
                            <p>검토 상태: {plan.reviewStatus}</p>
                            <p>
                                파일: <a href={plan.fileUrl}>다운로드</a>
                            </p>
                            <>
                                <Select
                                    value={reviewResult[plan.id] || 'APPROVED'} // 기본값: 'APPROVED'
                                    onChange={(e) =>
                                        setReviewResult((prev) => ({
                                            ...prev,
                                            [plan.id]: e.target.value as 'APPROVED' | 'REJECTED',
                                        }))
                                    }
                                >
                                    <option value="APPROVED">승인</option>
                                    <option value="REJECTED">거부</option>
                                </Select>
                                <Textarea
                                    value={comments[plan.id] || ''}
                                    onChange={(e) =>
                                        setComments((prev) => ({
                                            ...prev,
                                            [plan.id]: e.target.value,
                                        }))
                                    }
                                    placeholder="피드백을 입력하세요."
                                />
                                <Button onClick={() => handleApprove(plan.id)}>제출</Button>
                            </>
                            {plan.reviewStatus === 'APPROVED' && (
                                <Button
                                    style={{ marginTop: '10px', backgroundColor: '#4CAF50' }}
                                    onClick={() => handleNavigateToCreateProduct(plan.id)}
                                >
                                    보험 생성
                                </Button>
                            )}
                        </PlanDetails>
                    </PlanItem>
                ))}
            </PlanList>
        </Container>
    );
};

export default ViewAll;
