import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import {
    Container,
    Title,
    ButtonGroup,
    Button,
} from "../../styles/PaymentStyles";

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();
    const { contractId } = useParams<{ contractId: string }>();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <Container>
            <Header />
            <Title>결제 관리</Title>
            <ButtonGroup>
                <Button onClick={() => handleNavigate(`/accounts/${contractId}`)}>
                    계좌정보 입력하기
                </Button>
            </ButtonGroup>
        </Container>
    );
};

export default PaymentPage;
