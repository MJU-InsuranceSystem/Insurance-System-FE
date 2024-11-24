import React from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '../styles/AdminHomeStyles';

const AdminHome: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Container>
                <Title>
                    <span style={{ color: '#1058A3' }}>관리자용 보험사 시스템</span>
                    <span style={{ color: 'black' }}>입니다.</span>
                </Title>
                <Description>부서를 선택하세요</Description>
                <QuickMenu>
                    <MenuTitle>Quick Menu</MenuTitle>
                    <SubMenuTitle>부서 관리 메뉴</SubMenuTitle>
                    <MenuItems>
                        <MenuItem onClick={() => navigate('/planningTeam')}>상품 기획팀</MenuItem>
                        <MenuItem onClick={() => navigate('/underwritingTeam')}>U/W팀</MenuItem>
                        <MenuItem onClick={() => navigate('/salesEducationTeam')}>영업 교육 팀</MenuItem>
                        <MenuItem onClick={() => navigate('/marketingTeam')}>마케팅 팀</MenuItem>
                        <MenuItem onClick={() => navigate('/salesManagementTeam')}>영업 관리 팀</MenuItem>
                        <MenuItem onClick={() => navigate('/recruitmentTeam')}>채용 관리 팀</MenuItem>
                        <MenuItem onClick={() => navigate('/payrollTeam')}>급여 관리 팀</MenuItem>
                        <MenuItem onClick={() => navigate('/compensationTeam')}>보상 지원 팀</MenuItem>
                        <MenuItem onClick={() => navigate('/admin/contracts')}>계약 관리 팀</MenuItem>
                        <MenuItem onClick={() => navigate('/customerTeam')}>고객 관리 팀</MenuItem>
                        <MenuItem onClick={() => navigate('/employeeTeam')}>직원 관리 팀</MenuItem>
                        <MenuItem onClick={() => navigate('/accidentManagementTeam')}>사건 관리 팀</MenuItem> {/* 경로 수정 */}
                    </MenuItems>
                </QuickMenu>
                <ExitButton onClick={() => navigate('/')}>종료하기</ExitButton>
            </Container>
        </>
    );
};

export default AdminHome;
