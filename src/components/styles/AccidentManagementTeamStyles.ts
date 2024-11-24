import styled from 'styled-components';

// 기본 컨테이너 스타일
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
`;

// 타이틀 스타일
export const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
`;

// 설명 텍스트 스타일
export const Description = styled.p`
    font-size: 1.2rem;
    margin-bottom: 20px;
    text-align: center;
    color: #555;
`;

// 빠른 메뉴 컨테이너 스타일
export const QuickMenu = styled.div`
    width: 100%;
    max-width: 600px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
`;

// 메뉴 제목 스타일
export const MenuTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
`;

// 메뉴 아이템 목록 스타일
export const MenuItems = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

// 개별 메뉴 아이템 스타일
export const MenuItem = styled.li`
    font-size: 1rem;
    padding: 10px 15px;
    margin: 5px 0;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    color: #1058A3;

    &:hover {
        background-color: #f0f8ff;
    }
`;
