import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import Header from '../../Header';
import {
    Container,
    Title,
    Description,
    QuickMenu,
    MenuTitle,
    MenuItems,
    MenuItem,
    SubMenuTitle,
} from '../../styles/PlanningTeamStyles';

const PlanningTeam: React.FC = () => {
    // useNavigate 훅 초기화
    const navigate = useNavigate();

    // "상품을 기획한다" 버튼 클릭 핸들러
    const handleNavigatePlanning = () => {
        navigate('/planning'); // 원하는 경로로 이동 (예: /planning)
    };

    const handleNavigateApprove = () => {
        navigate('/approve');
    }
    // "상품을 설계한다" 버튼 클릭 핸들러
    const handleNavigateViewAll = () => {
        navigate('/viewAll'); // 상품 설계 화면으로 이동
    };


    console.log('PlanningTeam 컴포넌트가 렌더링되었습니다.');

    return (
        <>
            <Header />
            <Container>
                <Title>
                    <span style={{ color: '#1058A3' }}>상품 기획팀</span>
                    <span style={{ color: 'black' }}>입니다.</span>
                </Title>
                <Description>업무를 선택해주세요.</Description>
                <QuickMenu>
                    <MenuTitle>업무 선택</MenuTitle>
                    <SubMenuTitle>아래 중 수행하실 번호를 입력해주세요.</SubMenuTitle>
                    <MenuItems>
                        <MenuItem onClick={handleNavigatePlanning}>1. 상품 기획하기</MenuItem>
                        <MenuItem onClick={handleNavigateApprove}> 2. 상품 허가하기</MenuItem>
                        <MenuItem onClick={handleNavigateViewAll}>3. 상품 전체조회하기</MenuItem>
                    </MenuItems>
                </QuickMenu>
            </Container>
        </>
    );
};

export default PlanningTeam;
