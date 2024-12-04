import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createContract } from "../../../api/createContractApi"; // 기존 서버 API 사용
import Header from "../../Header";
import {
    Container,
    Title,
    Form,
    Label,
    Input,
    Button,
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

    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [alertShown, setAlertShown] = useState<boolean>(false); // 중복 알림 방지

    // 로컬 스토리지에서 데이터 불러오기
    useEffect(() => {
        if (!insuranceId) return;

        const savedData = loadFromLocalStorage(`insurance_${insuranceId}`);
        const savedTimestamp = localStorage.getItem(`insurance_${insuranceId}_timestamp`);
        const currentTime = Date.now();

        if (savedData && savedTimestamp) {
            const timeElapsed = (currentTime - parseInt(savedTimestamp)) / 1000;
            const remaining = 10 - timeElapsed;

            if (remaining <= 0) {
                // 시간이 초과된 경우
                removeFromLocalStorage(`insurance_${insuranceId}`);
                if (!alertShown) {
                    setAlertShown(true); // 중복 알림 방지
                }
            } else {
                setContractData(savedData);
                setRemainingTime(Math.ceil(remaining));
                startTimer(Math.ceil(remaining));
            }
        }
    }, [insuranceId, alertShown]);

    const startTimer = (seconds: number) => {
        if (timer) clearInterval(timer); // 기존 타이머 제거
        const newTimer = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev === null || prev <= 1) {
                    clearInterval(newTimer);
                    removeFromLocalStorage(`insurance_${insuranceId}`);
                    if (!alertShown) { // 알림이 한 번만 실행되도록 확인
                        setAlertShown(true); // 중복 방지
                    }
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
        setTimer(newTimer);
    };


    // 입력 핸들러
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

    // 임시 저장
    const handleSaveTemporary = () => {
        if (!insuranceId) {
            alert("유효하지 않은 보험 ID입니다.");
            return;
        }

        try {
            const startTime = performance.now(); // 요청 시작 시간

            const sanitizedData = {
                contractRequestDto: contractData.contractRequestDto || {},
                driverLicenseRequestDto: contractData.driverLicenseRequestDto || {},
                carRequestDto: contractData.carRequestDto || {},
            };

            saveToLocalStorage(`insurance_${insuranceId}`, sanitizedData);
            localStorage.setItem(`insurance_${insuranceId}_timestamp`, Date.now().toString());

            const endTime = performance.now(); // 요청 종료 시간
            const durationInSeconds = ((endTime - startTime) / 1000).toFixed(2); // 소요 시간 계산

            console.log(`임시 저장이 완료되었습니다. (${durationInSeconds}초 소요)`);

            setAlertShown(false); // 알림 상태 초기화
            setRemainingTime(10); // 10초 설정
            startTimer(10); // 타이머 시작
        } catch (error) {
            console.error("임시 저장 실패:", error);
            alert("임시 저장에 실패했습니다.");
        }
    };


    // 최종 저장: 서버로 데이터 전송
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!insuranceId) {
            alert("유효하지 않은 보험 ID입니다.");
            return;
        }

        try {
            console.log("=== 계약 생성 요청 시작 ===");
            console.log("Insurance ID:", insuranceId);
            console.log("Request Data:", JSON.stringify(contractData, null, 2));

            const response = await createContract(insuranceId, contractData);

            console.log("=== 계약 생성 성공 ===");
            console.log("Response:", response);

            alert(`계약이 성공적으로 생성되었습니다!`);
            navigate("/");
        } catch (error: unknown) {
            console.error("=== 계약 생성 실패 ===");
            if (error instanceof Error) {
                console.error("Error Message:", error.message);
                alert(`계약 생성 실패: ${error.message}`);
            } else {
                console.error("Unexpected Error:", error);
                alert("계약 생성 실패: 알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    return (
        <Container>
            <Header />
            <Title>계약 생성</Title>

            <Form onSubmit={handleSubmit}>
                 {remainingTime !== null && (
                <div>
                    <strong>남은 시간: {remainingTime}초</strong>
                </div>
                )}
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
                </select>
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
                <Label>무사고 기간</Label>
                <Input
                    type="number"
                    name="carRequestDto.accidentFreePeriod"
                    value={contractData.carRequestDto.accidentFreePeriod}
                    onChange={handleChange}
                />
                <Button type="submit">계약 생성</Button>
                <Button type="button" onClick={handleSaveTemporary}>
                    임시 저장
                </Button>
            </Form>
        </Container>
    );
};

export default CreateContract;

// 유틸 함수
const saveToLocalStorage = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save data to localStorage:", error);
    }
};

const loadFromLocalStorage = (key: string): any | null => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Failed to load data from localStorage:", error);
        return null;
    }
};

const removeFromLocalStorage = (key: string) => {
    try {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_timestamp`);
    } catch (error) {
        console.error("Failed to remove data from localStorage:", error);
    }
};
