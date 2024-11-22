import styled from 'styled-components';

// 전체 컨테이너
export const Container = styled.div`
    background-color: #ffffff;
    text-align: center;
    padding: 40px 20px;
`;

// 타이틀 스타일
export const Title = styled.h1`
    color: #000000;
    font-size: 26px;
    margin: 0;
`;

// 설명 텍스트
export const Description = styled.p`
    color: #000000;
    font-size: 20px;
    margin-top: 20px;
`;

// Quick Menu 컨테이너
export const QuickMenu = styled.div`
    background-color: #1058a3;
    padding: 22px;
    border-radius: 0;
    width: 100vw; /* 화면 전체 너비를 채우도록 설정 */
    margin-left: calc(50% - 50vw); /* 화면 왼쪽 여백을 제거 */
    text-align: center; /* 버튼들을 중앙에 정렬 */
`;

// Quick Menu 제목
export const MenuTitle = styled.h2`
    font-size: 16px;
    color: #ffffff;
    margin: 0;
    padding-left: 20px;
`;

// 자주 찾는 메뉴 제목
export const SubMenuTitle = styled.h2`
    font-size: 30px;
    color: #ffffff;
    margin: 16px 20px 0;
`;

// 메뉴 아이템들을 감싸는 컨테이너
export const MenuItems = styled.div`
    display: flex; /* flexbox를 사용하여 버튼들을 정렬 */
    justify-content: center; /* 버튼들을 중앙에 정렬 */
    gap: 6px; /* 버튼 간의 간격을 좁게 설정 */
    flex-wrap: wrap; /* 버튼들이 화면에 맞게 줄 바꿈되도록 설정 */
    margin-top: 30px;
    margin-bottom: 30px;
`;

// 개별 메뉴 아이템
export const MenuItem = styled.div`
    background-color: #ffffff;
    color: #1058a3;
    padding: 40px 20px; /* padding은 원래대로 유지 */
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    width: 180px; /* 가로 크기를 180px로 조금만 줄임 */
    display: inline-block; /* 버튼들이 줄어든 크기를 유지하도록 설정 */

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
    border-radius: 0;
    font-size: 16px;
    cursor: pointer;
    margin-top: 60px;

    &:hover {
        background-color: #083d67;
    }
`;
