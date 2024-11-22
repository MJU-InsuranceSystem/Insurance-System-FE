import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router 사용
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
    DetailButton, // 스타일 추가
} from '../../styles/InsuranceListStyles';

const InsuranceList: React.FC = () => {
    const [insuranceList, setInsuranceList] = useState<Insurance[]>([]); // 초기 상태를 빈 배열로 설정
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    useEffect(() => {
        const fetchInsuranceList = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getInsuranceList();
                setInsuranceList(data);
            } catch (err) {
                console.error('Error fetching insurance list:', err);  // Log the error
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
                {Array.isArray(insuranceList) ? (
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
                            {/* 상세조회 버튼 추가 */}
                            <DetailButton
                                onClick={() => navigate(`/insurance/${insurance.id}`)}
                            >
                                상세조회
                            </DetailButton>
                        </InsuranceItem>
                    ))
                ) : (
                    <ErrorText>보험 상품 데이터가 유효하지 않습니다.</ErrorText>
                )}
            </InsuranceListContainer>
        </Container>
    );
};

export default InsuranceList;
