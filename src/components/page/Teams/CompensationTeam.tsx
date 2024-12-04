import React from "react";
import { Link } from "react-router-dom";
import Header from '../../AdminHeader';
import {
    Container,
    Title,
    ButtonContainer,
    Button,
} from "../../styles/CompensationTeamStyles";

const CompensationTeam: React.FC = () => {
    return (
        <Container>
            <Header />  {/* 헤더 추가 */}
            <Title>보상 지원 팀</Title>
            <ButtonContainer>
                <Link to="/compensation-team/accidents">
                    <Button>사건 전체 리스트 조회</Button>
                </Link>
                <Link to="/claims">
                    <Button>보험 청구 내역 조회</Button>
                </Link>
            </ButtonContainer>
        </Container>
    );
};

export default CompensationTeam;
