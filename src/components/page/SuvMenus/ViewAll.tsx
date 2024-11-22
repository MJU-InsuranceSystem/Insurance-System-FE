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
    StatusMessage,
} from '../../styles/ViewAllStyles';

const ViewAll: React.FC = () => {
    const [plans, setPlans] = useState<InsurancePlan[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reviewResult, setReviewResult] = useState<{ [key: string]: 'APPROVED' | 'REJECTED' }>({});
    const [comments, setComments] = useState<{ [key: string]: string }>({});
    const [statusMessage, setStatusMessage] = useState<{ [key: string]: string }>({});

    const LOCAL_STORAGE_KEY = 'statusMessage';
    const REVIEW_RESULT_KEY = 'reviewResult';
    const navigate = useNavigate();

    // 플랜 목록을 가져오는 함수
    useEffect(() => {
        const fetchPlans = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log('Fetching insurance plans...');
                const data = await getInsurancePlans();
                console.log('Fetched insurance plans:', data); // 디버깅: API에서 반환된 데이터 확인

                setPlans(data);

                // 로컬 스토리지에서 상태 메시지 복원
                const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (savedMessages) {
                    const parsedMessages = JSON.parse(savedMessages);
                    setStatusMessage(parsedMessages);
                    console.log('Restored Status Messages:', parsedMessages); // 디버깅
                }

                // 로컬 스토리지에서 reviewResult 복원
                const savedReviewResult = localStorage.getItem(REVIEW_RESULT_KEY);
                if (savedReviewResult) {
                    setReviewResult(JSON.parse(savedReviewResult));
                    console.log('Restored Review Result:', savedReviewResult); // 디버깅
                }
            } catch (err) {
                console.error('Error fetching plans:', err);
                setError('데이터를 가져오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    // 승인 요청 처리
    const handleApprove = async (planId: string) => {
        const result = reviewResult[planId] || 'APPROVED';  // 기본값은 'APPROVED'
        const comment = comments[planId] || '';  // 피드백 내용

        const requestBody = {
            reviewResult: result,  // 'APPROVED' 또는 'REJECTED'
            comments: comment,     // 피드백 내용
        };

        console.log('Submitting approval request for plan:', planId); // 디버깅
        console.log('Request Body:', requestBody);  // 디버깅: 서버에 보내는 데이터 확인

        try {
            // requestBody를 approvePlan에 전달
            await approvePlan(planId, requestBody.reviewResult, requestBody.comments);

            // 상태 메시지 업데이트
            const message = result === 'APPROVED' ? '승인되었습니다.' : '거부되었습니다';
            const updatedStatusMessage = { ...statusMessage, [planId]: message };
            setStatusMessage(updatedStatusMessage);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedStatusMessage));

            // reviewResult를 로컬 스토리지에 저장
            const updatedReviewResult = { ...reviewResult, [planId]: result };
            localStorage.setItem(REVIEW_RESULT_KEY, JSON.stringify(updatedReviewResult));
            setReviewResult(updatedReviewResult);

            // 플랜 상태 업데이트
            const updatedPlans = plans.map((plan) =>
                plan.id === planId ? { ...plan, reviewStatus: result } : plan
            );
            setPlans(updatedPlans);
        } catch (err) {
            alert('승인 요청에 실패했습니다.');
            console.error('Error approving plan:', err);
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
                            {statusMessage[plan.id] ? (
                                <StatusMessage>{statusMessage[plan.id]}</StatusMessage>
                            ) : (
                                <>
                                    <Select
                                        value={reviewResult[plan.id] || 'APPROVED'} // 기본값을 'APPROVED'로 설정
                                        onChange={(e) => {
                                            const newResult = e.target.value as 'APPROVED' | 'REJECTED';
                                            console.log('Review Result Changed:', newResult);  // 디버깅: 값이 변경되는지 확인
                                            setReviewResult((prev) => ({
                                                ...prev,
                                                [plan.id]: newResult, // 상태 업데이트
                                            }));
                                        }}
                                    >
                                        <option value="APPROVED">승인</option>
                                        <option value="REJECTED">거부</option>
                                    </Select>
                                    <Textarea
                                        value={comments[plan.id] || ''}
                                        onChange={(e) => {
                                            console.log('Comment Changed:', e.target.value);  // 디버깅: 피드백 값 변경 확인
                                            setComments((prev) => ({
                                                ...prev,
                                                [plan.id]: e.target.value,
                                            }));
                                        }}
                                        placeholder="피드백을 입력하세요."
                                    />
                                    <Button onClick={() => handleApprove(plan.id)}>제출</Button>
                                </>
                            )}
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
