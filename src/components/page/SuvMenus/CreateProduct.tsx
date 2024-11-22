import React, { useState } from 'react';
import { createProduct } from '../../../api/createProductApi';
import Header from '../../Header';
import {
    Container,
    Title,
    Form,
    Label,
    Input,
    TextArea,
    Select,
    Button,
    ErrorText,
    LoadingSpinner,
} from '../../styles/CreateProductStyles';

const saleTargetOptions = ['청년층', '중년층', '노년층'];
const insuranceTypeOptions = [
    '화재보험',
    '자동차보험',
    '생명보험',
    '건강보험',
    '여행보험',
    '암보험',
];

const CreateProduct: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        eligibleAgeMin: '',
        eligibleAgeMax: '',
        coverageRange: '',
        coverageAmountMax: '',
        duration: '',
        exclusions: '',
        monthlyPremium: '',
        salesStartDate: '',
        salesEndDate: '',
        saleTarget: '',
        insuranceType: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        for (const key in formData) {
            if (!formData[key as keyof typeof formData]) {
                setError(`${key}를 입력해주세요.`);
                return false;
            }
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            await createProduct(formData);
            alert('보험 상품이 성공적으로 생성되었습니다!');
            setFormData({
                name: '',
                description: '',
                eligibleAgeMin: '',
                eligibleAgeMax: '',
                coverageRange: '',
                coverageAmountMax: '',
                duration: '',
                exclusions: '',
                monthlyPremium: '',
                salesStartDate: '',
                salesEndDate: '',
                saleTarget: '',
                insuranceType: '',
            });
        } catch (error) {
            console.error(error);
            setError(error instanceof Error ? error.message : '제출에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Title>보험 상품 생성</Title>
                <Form onSubmit={handleSubmit}>
                    {error && <ErrorText>{error}</ErrorText>}
                    <Label>보험 이름</Label>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="보험 이름을 입력해주세요."
                    />

                    <Label>보험 설명</Label>
                    <TextArea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="보험 설명을 입력해주세요."
                    />

                    <Label>최소 연령</Label>
                    <Input
                        name="eligibleAgeMin"
                        value={formData.eligibleAgeMin}
                        onChange={handleChange}
                        placeholder="최소 연령을 입력해주세요."
                    />

                    <Label>최대 연령</Label>
                    <Input
                        name="eligibleAgeMax"
                        value={formData.eligibleAgeMax}
                        onChange={handleChange}
                        placeholder="최대 연령을 입력해주세요."
                    />

                    <Label>보장 범위</Label>
                    <TextArea
                        name="coverageRange"
                        value={formData.coverageRange}
                        onChange={handleChange}
                        placeholder="보장 범위를 입력해주세요."
                    />

                    <Label>보장 최대 금액</Label>
                    <Input
                        name="coverageAmountMax"
                        value={formData.coverageAmountMax}
                        onChange={handleChange}
                        placeholder="보장 최대 금액을 입력해주세요."
                    />

                    <Label>보험 기간 (년)</Label>
                    <Input
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="보험 기간을 입력해주세요."
                    />

                    <Label>면책</Label>
                    <TextArea
                        name="exclusions"
                        value={formData.exclusions}
                        onChange={handleChange}
                        placeholder="면책 사항을 입력해주세요."
                    />

                    <Label>보험료 (월)</Label>
                    <Input
                        name="monthlyPremium"
                        value={formData.monthlyPremium}
                        onChange={handleChange}
                        placeholder="보험료를 입력해주세요."
                    />

                    <Label>판매 시작 날짜</Label>
                    <Input
                        type="date"
                        name="salesStartDate"
                        value={formData.salesStartDate}
                        onChange={handleChange}
                    />

                    <Label>판매 종료 날짜</Label>
                    <Input
                        type="date"
                        name="salesEndDate"
                        value={formData.salesEndDate}
                        onChange={handleChange}
                    />

                    <Label>판매 대상</Label>
                    <Select
                        name="saleTarget"
                        value={formData.saleTarget}
                        onChange={handleChange}
                    >
                        <option value="">판매 대상을 선택해주세요.</option>
                        {saleTargetOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </Select>

                    <Label>보험 종류</Label>
                    <Select
                        name="insuranceType"
                        value={formData.insuranceType}
                        onChange={handleChange}
                    >
                        <option value="">보험 종류를 선택해주세요.</option>
                        {insuranceTypeOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </Select>

                    <Button type="submit" disabled={loading}>
                        {loading ? <LoadingSpinner /> : '생성하기'}
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default CreateProduct;
