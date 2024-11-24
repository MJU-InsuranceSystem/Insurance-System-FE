import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createContract } from "../../../api/createContractApi";
import Header from "../../Header";
import {
    Container,
    Title,
    Form,
    Label,
    Input,
    Button,
    ErrorText,
    SuccessMessage,
} from "../../styles/CreateContractStyles";

interface ContractData {
    contractRequestDto: {
        paymentDate: string;
        paymentMethod: string;
        paymentAccount: string;
        bank: string;
        startDate: string;
        endDate: string;
    };
    driverLicenseRequestDto: {
        licenseNumber: string;
        licenseType: string;
        issueDate: string;
        validityPeriod: string;
    };
    carRequestDto: {
        carNumber: string;
        carType: string;
        modelYear: string;
        registrationDate: string;
        ownershipStatus: string;
        accidentFreePeriod: string;
    };
}

const CreateContract: React.FC = () => {
    const { insuranceId } = useParams<{ insuranceId: string }>();
    const navigate = useNavigate();

    const [contractData, setContractData] = useState<ContractData>({
        contractRequestDto: {
            paymentDate: "",
            paymentMethod: "",
            paymentAccount: "",
            bank: "",
            startDate: "",
            endDate: "",
        },
        driverLicenseRequestDto: {
            licenseNumber: "",
            licenseType: "",
            issueDate: "",
            validityPeriod: "",
        },
        carRequestDto: {
            carNumber: "",
            carType: "",
            modelYear: "",
            registrationDate: "",
            ownershipStatus: "",
            accidentFreePeriod: "",
        },
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const [parent, key] = name.split(".");
        setContractData((prev) => ({
            ...prev,
            [parent]: {
                ...prev[parent as keyof ContractData],
                [key]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!insuranceId) {
            setError("유효하지 않은 보험 ID입니다.");
            return;
        }

        try {
            setError(null);
            setSuccess(null);

            console.log("=== API 요청 시작 ===");
            console.log("Insurance ID:", insuranceId);
            console.log("Request Data:", JSON.stringify(contractData, null, 2));

            const response = await createContract(insuranceId, contractData);
            console.log("=== API 요청 성공 ===");
            console.log("Response:", response);

            setSuccess(`계약이 성공적으로 생성되었습니다! 고객 ID: ${response.customerId}`);
            navigate("/");
        } catch (error: unknown) {
            console.error("=== API 요청 실패 ===");
            if (error instanceof Error) {
                console.error("Error Message:", error.message);
                setError(error.message);
            } else {
                console.error("Unexpected Error:", error);
                setError("알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    return (
        <Container>
            <Header />
            <Title>계약 생성</Title>
            {error && <ErrorText>{error}</ErrorText>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            <Form onSubmit={handleSubmit}>
                <Label>결제일</Label>
                <Input
                    type="text"
                    name="contractRequestDto.paymentDate"
                    value={contractData.contractRequestDto.paymentDate}
                    onChange={handleChange}
                    placeholder="결제일을 입력하세요 (숫자)"
                />
                <Label>결제 방식</Label>
                <select
                    name="contractRequestDto.paymentMethod"
                    value={contractData.contractRequestDto.paymentMethod}
                    onChange={handleChange}
                >
                    <option value="">선택</option>
                    <option value="자동 이체">자동 이체</option>
                    <option value="수동 이체">수동 이체</option>
                </select>
                <Label>결제 계좌</Label>
                <Input
                    type="text"
                    name="contractRequestDto.paymentAccount"
                    value={contractData.contractRequestDto.paymentAccount}
                    onChange={handleChange}
                    placeholder="계좌 번호를 입력하세요"
                />
                <Label>은행</Label>
                <select
                    name="contractRequestDto.bank"
                    value={contractData.contractRequestDto.bank}
                    onChange={handleChange}
                >
                    <option value="">선택</option>
                    <option value="국민은행">국민은행</option>
                    <option value="기업은행">기업은행</option>
                </select>
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
                <Label>운전면허 번호</Label>
                <Input
                    type="text"
                    name="driverLicenseRequestDto.licenseNumber"
                    value={contractData.driverLicenseRequestDto.licenseNumber}
                    onChange={handleChange}
                />
                <Label>운전면허 유형</Label>
                <select
                    name="driverLicenseRequestDto.licenseType"
                    value={contractData.driverLicenseRequestDto.licenseType}
                    onChange={handleChange}
                >
                    <option value="">선택</option>
                    <option value="1종 보통">1종 보통</option>
                    <option value="2종 보통">2종 보통</option>
                    <option value="1종 대형">1종 대형</option>
                </select>
                <Label>운전면허 발급일</Label>
                <Input
                    type="date"
                    name="driverLicenseRequestDto.issueDate"
                    value={contractData.driverLicenseRequestDto.issueDate}
                    onChange={handleChange}
                />
                <Label>운전면허 유효기간</Label>
                <Input
                    type="date"
                    name="driverLicenseRequestDto.validityPeriod"
                    value={contractData.driverLicenseRequestDto.validityPeriod}
                    onChange={handleChange}
                />
                <Label>차량 번호</Label>
                <Input
                    type="text"
                    name="carRequestDto.carNumber"
                    value={contractData.carRequestDto.carNumber}
                    onChange={handleChange}
                />
                <Label>차량 유형</Label>
                <select
                    name="carRequestDto.carType"
                    value={contractData.carRequestDto.carType}
                    onChange={handleChange}
                >
                    <option value="">선택</option>
                    <option value="승용차">승용차</option>
                    <option value="SUV">SUV</option>
                    <option value="트럭">트럭</option>
                    <option value="밴">밴</option>
                    <option value="오토바이">오토바이</option>
                    <option value="특수차량">특수차량</option>
                </select>
                <Label>모델 연도</Label>
                <Input
                    type="text"
                    name="carRequestDto.modelYear"
                    value={contractData.carRequestDto.modelYear}
                    onChange={handleChange}
                    placeholder="모델 연도를 입력하세요"
                />
                <Label>차량 등록 날짜</Label>
                <Input
                    type="date"
                    name="carRequestDto.registrationDate"
                    value={contractData.carRequestDto.registrationDate}
                    onChange={handleChange}
                />
                <Label>소유 상태</Label>
                <select
                    name="carRequestDto.ownershipStatus"
                    value={contractData.carRequestDto.ownershipStatus}
                    onChange={handleChange}
                >
                    <option value="">선택</option>
                    <option value="소유">소유</option>
                    <option value="리스">리스</option>
                    <option value="렌탈">렌탈</option>
                </select>
                <Label>무사고 기간 (개월)</Label>
                <Input
                    type="number"
                    name="carRequestDto.accidentFreePeriod"
                    value={contractData.carRequestDto.accidentFreePeriod}
                    onChange={handleChange}
                />
                <Button type="submit">계약 생성</Button>
            </Form>
        </Container>
    );
};

export default CreateContract;
