// CreateContract.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createContract } from '../../../api/createContractApi'; // 계약 생성 API
import { getInsuranceList, Insurance } from '../../../api/getInsuranceListApi'; // 보험 목록 조회 API
import Header from '../../Header'; // 헤더 컴포넌트
import {
    Container,
    Title,
    Form,
    Label,
    Input,
    Button,
    ErrorText,
    SuccessMessage,
} from '../../styles/CreateContractStyles'; // 스타일 컴포넌트들

const CreateContract: React.FC = () => {
    const { insuranceId } = useParams<{ insuranceId: string }>(); // URL로 보험 ID 받기

    const [contractData, setContractData] = useState({
        contractRequestDto: {
            paymentDate: '',
            paymentMethod: '',
            paymentAccount: '',
            bank: '',
            startDate: '',
            endDate: '',
        },
        driverLicenseRequestDto: {
            licenseNumber: '',
            licenseType: '',
            issueDate: '',
            validityPeriod: '',
        },
        carRequestDto: {
            carNumber: '',
            carType: '',
            modelYear: '',
            registrationDate: '',
            ownershipStatus: '',
            accidentFreePeriod: '',
        },
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [insurance, setInsurance] = useState<Insurance | null>(null); // 보험 상품 데이터

    // 보험 상품 목록 가져오기
    useEffect(() => {
        const fetchInsuranceList = async () => {
            try {
                const insuranceList = await getInsuranceList();
                console.log('보험 목록:', insuranceList);  // 보험 목록을 콘솔에 출력하여 제대로 데이터가 반환되는지 확인

                const selectedInsurance = insuranceList.find(
                    (insurance) => insurance.id.toString() === insuranceId
                );
                setInsurance(selectedInsurance || null); // 선택된 보험 상품
            } catch (err) {
                setError('보험 상품 정보를 가져오는 데 실패했습니다.');
                console.error('Error fetching insurance list:', err);
            }
        };

        fetchInsuranceList();
    }, [insuranceId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const [parent, key] = name.split('.');
        setContractData((prev) => ({
            ...prev,
            [parent]: {
                ...prev[parent as keyof typeof contractData],
                [key]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!insuranceId || !insurance) {
            setError('유효하지 않은 보험 ID입니다.');
            return;
        }

        try {
            setError(null);
            setSuccess(null);
            // 계약 생성 API 호출
            await createContract(insuranceId, contractData); // 보험 ID와 계약 데이터 전달
            setSuccess('계약이 성공적으로 생성되었습니다!');
        } catch (error) {
            console.error('계약 생성 중 오류 발생:', error);
            setError(error instanceof Error ? error.message : '계약 생성 중 알 수 없는 오류가 발생했습니다.');
        }
    };

    return (
        <Container>
            <Header />
            <Title>계약 생성</Title>
            {error && <ErrorText>{error}</ErrorText>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            {insurance ? (
                <Form onSubmit={handleSubmit}>
                    <Label>보험 상품: {insurance.name}</Label>
                    <Label>결제일</Label>
                    <Input
                        type="text"
                        name="contractRequestDto.paymentDate"
                        value={contractData.contractRequestDto.paymentDate}
                        onChange={handleChange}
                    />
                    <Label>결제 방식</Label>
                    <Input
                        type="text"
                        name="contractRequestDto.paymentMethod"
                        value={contractData.contractRequestDto.paymentMethod}
                        onChange={handleChange}
                    />
                    <Label>결제 계좌</Label>
                    <Input
                        type="text"
                        name="contractRequestDto.paymentAccount"
                        value={contractData.contractRequestDto.paymentAccount}
                        onChange={handleChange}
                    />
                    <Label>은행</Label>
                    <Input
                        type="text"
                        name="contractRequestDto.bank"
                        value={contractData.contractRequestDto.bank}
                        onChange={handleChange}
                    />
                    <Label>계약 시작 날짜</Label>
                    <Input
                        type="date"
                        name="contractRequestDto.startDate"
                        value={contractData.contractRequestDto.startDate}
                        onChange={handleChange}
                    />
                    <Label>계약 종료 날짜</Label>
                    <Input
                        type="date"
                        name="contractRequestDto.endDate"
                        value={contractData.contractRequestDto.endDate}
                        onChange={handleChange}
                    />
                    <Button type="submit">계약 생성</Button>
                </Form>
            ) : (
                <p>보험 상품을 불러오는 중입니다...</p>
            )}
        </Container>
    );
};

export default CreateContract;
