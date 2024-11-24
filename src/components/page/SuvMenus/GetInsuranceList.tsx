import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInsuranceList, Insurance } from '../../../api/getInsuranceListApi';
import Header from '../../Header';
import {
    Container,
    Title,
    InsuranceListContainer,
    InsuranceItem,
    InsuranceName,
    InsuranceDetails,
    ErrorText,
    LoadingSpinner,
    DetailButton,
} from '../../styles/InsuranceListStyles';

const InsuranceList: React.FC = () => {
    const [insuranceList, setInsuranceList] = useState<Insurance[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchInsuranceList = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getInsuranceList();
                console.log('받아온 보험 상품 리스트:', data);
                setInsuranceList(data);
            } catch (err) {
                console.error('보험 상품 데이터를 가져오는 중 오류:', err);
                setError('보험 상품 데이터를 가져오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchInsuranceList();
    }, []);

    if (loading) {
        return (
            <Container>
                <Header />
                <LoadingSpinner />
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
            <Title>보험 상품 목록</Title>
            <InsuranceListContainer>
                {insuranceList.length > 0 ? (
                    insuranceList.map((insurance) => (
                        <InsuranceItem key={insurance.id}>
                            <InsuranceName>{insurance.name}</InsuranceName>
                            <InsuranceDetails>
                                <p>설명: {insurance.description}</p>
                                <p>보험 종류: {insurance.insuranceType}</p>
                                <p>판매 대상: {insurance.saleTarget}</p>
                                <p>보험료 (월): {insurance.monthlyPremium.toLocaleString()}원</p>
                                <p>
                                    가입 가능 연령: {insurance.eligibleAgeMin} ~ {insurance.eligibleAgeMax}세
                                </p>
                            </InsuranceDetails>
                            <DetailButton onClick={() => navigate(`/insurance/${insurance.id}`)}>
                                상세조회
                            </DetailButton>
                        </InsuranceItem>
                    ))
                ) : (
                    <ErrorText>보험 상품 데이터가 없습니다.</ErrorText>
                )}
            </InsuranceListContainer>
        </Container>
    );
};

export default InsuranceList;
