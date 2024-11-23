import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createContract } from "../../../api/createContractApi";
import { AxiosError } from "axios";
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

const CreateContract: React.FC = () => {
    const { insuranceId } = useParams<{ insuranceId: string }>();

    const [contractData, setContractData] = useState({
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
                ...prev[parent as keyof typeof contractData],
                [key]: value,
            },
        }));
        console.log("Updated Field:", { [name]: value }); // 디버깅용
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!insuranceId) {
            setError("유효하지 않은 보험 ID입니다.");
            return;
        }

        const formattedData = {
            ...contractData,
            contractRequestDto: {
                ...contractData.contractRequestDto,
                paymentDate: String(contractData.contractRequestDto.paymentDate),
            },
            carRequestDto: {
                ...contractData.carRequestDto,
                accidentFreePeriod: String(contractData.carRequestDto.accidentFreePeriod),
            },
        };

        console.log("Formatted Data:", JSON.stringify(formattedData, null, 2)); // 디버깅용

        try {
            setError(null);
            setSuccess(null);

            // API 호출
            await createContract(insuranceId, formattedData);

            setSuccess("계약이 성공적으로 생성되었습니다!");
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error("Server Error:", error.response?.data || error.message); // 서버 응답 디버깅
                setError(error.response?.data?.message || "계약 생성 중 알 수 없는 오류가 발생했습니다.");
            } else {
                console.error("Unexpected Error:", error);
                setError("예기치 않은 오류가 발생했습니다.");
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
                    placeholder="결제일을 입력하세요."
                />
                <Label>결제 방식</Label>
                <select
                    name="contractRequestDto.paymentMethod"
                    value={contractData.contractRequestDto.paymentMethod}
                    onChange={handleChange}
                >
                    <option value="">선택</option>
                    <option value="AUTO_PAYMENT">자동이체</option>
                    <option value="DIRECT_PAYMENT">수동</option>
                </select>
                <Label>결제 계좌</Label>
                <Input
                    type="text"
                    name="contractRequestDto.paymentAccount"
                    value={contractData.contractRequestDto.paymentAccount}
                    onChange={handleChange}
                    placeholder="결제 계좌를 입력하세요."
                />
                <Label>은행</Label>
                <select
                    name="contractRequestDto.bank"
                    value={contractData.contractRequestDto.bank}
                    onChange={handleChange}
                >
                    <option value="">선택</option>
                    <option value="KB">국민은행</option>
                    <option value="IBK">기업은행</option>
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
                    placeholder="운전면허 번호를 입력하세요."
                />
                <Label>운전면허 유형</Label>
                <select
                    name="driverLicenseRequestDto.licenseType"
                    value={contractData.driverLicenseRequestDto.licenseType}
                    onChange={handleChange}
                >
                    <option value="">선택</option>
                    <option value="CLASS1">1종 보통</option>
                    <option value="CLASS2">2종 보통</option>
                    <option value="FCHVDL">1종 대형</option>
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
                    placeholder="차량 번호를 입력하세요."
                />
                <Label>차량 유형</Label>
                <select
                    name="carRequestDto.carType"
                    value={contractData.carRequestDto.carType}
                    onChange={handleChange}
                >
                    <option value="">선택</option>
                    <option value="PASSENGER_CAR">승용차</option>
                    <option value="SUV">SUV</option>
                    <option value="TRUCK">트럭</option>
                    <option value="VAN">밴</option>
                    <option value="RV">오토바이</option>
                    <option value="SPECIAL_VEHICLE">특수차량</option>
                </select>
                <Label>차량 모델 연도</Label>
                <Input
                    type="date"
                    name="carRequestDto.modelYear"
                    value={contractData.carRequestDto.modelYear}
                    onChange={handleChange}
                />
                <Label>차량 등록 날짜</Label>
                <Input
                    type="date"
                    name="carRequestDto.registrationDate"
                    value={contractData.carRequestDto.registrationDate}
                    onChange={handleChange}
                />
                <Label>차량 소유 상태</Label>
                <select
                    name="carRequestDto.ownershipStatus"
                    value={contractData.carRequestDto.ownershipStatus}
                    onChange={handleChange}
                >
                    <option value="">선택</option>
                    <option value="OWN">소유</option>
                    <option value="LEASE">리스</option>
                    <option value="RENTAL">렌탈</option>
                </select>
                <Label>무사고 기간 (개월)</Label>
                <Input
                    type="number"
                    name="carRequestDto.accidentFreePeriod"
                    value={contractData.carRequestDto.accidentFreePeriod}
                    onChange={handleChange}
                    placeholder="무사고 기간을 입력하세요."
                />
                <Button type="submit">계약 생성</Button>
            </Form>
        </Container>
    );
};

export default CreateContract;
