import React, { useEffect, useState } from 'react';
import { getInsurancePlans, InsurancePlan } from '../../../api/viewAllApi';
import {
    Container,
    Title,
    PlanList,
    PlanItem,
    PlanTitle,
    PlanDetails,
    ErrorText,
    LoadingSpinner,
} from '../../styles/ViewAllStyles';

const ViewAll: React.FC = () => {
    const [plans, setPlans] = useState<InsurancePlan[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getInsurancePlans();
                console.log('[Fetched Plans]', data);
                setPlans(data);
            } catch (err) {
                console.error('[Fetch Error]', err);
                setError(err instanceof Error ? err.message : '데이터를 가져오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    if (loading) {
        return (
            <Container>
                <LoadingSpinner />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <ErrorText>{error}</ErrorText>
            </Container>
        );
    }

    if (!plans.length) {
        return (
            <Container>
                <ErrorText>플랜이 없습니다.</ErrorText>
            </Container>
        );
    }

    return (
        <Container>
            <Title>보험 플랜 목록</Title>
            <PlanList>
                {plans.map((plan) => (
                    <PlanItem key={plan.id}>
                        <PlanTitle>{plan.title}</PlanTitle>
                        <PlanDetails>
                            <p>유형: {plan.insurancePlanType}</p>
                            <p>기획자: {plan.plannerName}</p>
                            <p>설명: {plan.description}</p>
                        </PlanDetails>
                    </PlanItem>
                ))}
            </PlanList>
        </Container>
    );
};

export default ViewAll;
