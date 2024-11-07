import styled from 'styled-components';

// 전체 컨테이너
export const Container = styled.div`
    background-color: #ffffff;
    text-align: center;
    padding: 40px 20px;
`;

// 타이틀 스타일
export const Title = styled.h1`
    color: #000000; /* 검정색 텍스트 */
    font-size: 26px;
    margin: 0;
    white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정 */
`;

// 설명 텍스트
export const Description = styled.p`
    color: #000000;
    font-size: 20px;
    margin-top: 20px;
    white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정 */
`;

// Quick Menu 컨테이너
export const QuickMenu = styled.div`
    background-color: #1058a3;
    padding: 22px;
    border-radius: 0; /* 각진 형태 */
    margin: 0; /* 여백 제거 */
    width: 100vw; /* 전체 가로 폭 채우기 */
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    text-align: left; /* 왼쪽 정렬 */
`;

// Quick Menu 제목
export const MenuTitle = styled.h2`
    font-size: 16px;
    color: #ffffff;
    margin: 0;
    padding-left: 20px;
    white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정 */
`;

// 자주 찾는 메뉴 제목
export const SubMenuTitle = styled.h2`
    font-size: 30px;
    color: #ffffff;
    margin: 16px 20px 0;
    white-space: nowrap;
`;

// 메뉴 아이템들을 감싸는 컨테이너
export const MenuItems = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 30px; 
    margin-bottom: 30px;
`;

// 개별 메뉴 아이템
export const MenuItem = styled.div`
    background-color: #ffffff;
    color: #1058a3;
    padding: 40px 70px; 
    border-radius: 5px;
    font-size: 16px; 
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        background-color: #f0f0f0;
    }
`;

// 종료 버튼 스타일
export const ExitButton = styled.button`
    background-color: #1058a3;
    color: #ffffff;
    padding: 10px 120px;
    border: none;
    border-radius: 0px; 
    font-size: 16px;
    cursor: pointer;
    margin-top: 60px; 
    white-space: nowrap; 

    &:hover {
        background-color: #083d67;
    }
`;
