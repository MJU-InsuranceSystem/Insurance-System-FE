import React from 'react';
import Header from '../Header';
import {
    Container,
    Title,
    Description,
    QuickMenu,
    MenuTitle,
    MenuItems,
    MenuItem,
    ExitButton,
    SubMenuTitle,
} from '../styles/HomeStyles';

const Home: React.FC = () => {
    return (
        <>
            <Header />
            <Container>
                <Title>
                    <span style={{ color: '#1058A3' }}>고객용 보험사 시스템</span>
                    <span style={{ color: 'black' }}>입니다.</span>
                </Title>
                <Description>원하시는 업무를 고르세요</Description>
                <QuickMenu>
                    <MenuTitle>Quick Menu</MenuTitle>
                    <SubMenuTitle>자주찾는 메뉴</SubMenuTitle>
                    <MenuItems>
                        <MenuItem>보험 가입 신청하기</MenuItem>
                        <MenuItem>보험금을 청구하기</MenuItem>
                        <MenuItem>보험료 납부하기</MenuItem>
                        <MenuItem>가입 보험 조회하기</MenuItem>
                        <MenuItem>납부 조회하기</MenuItem>
                    </MenuItems>
                </QuickMenu>
                <ExitButton>종료하기</ExitButton>
            </Container>
        </>
    );
};

export default Home;
