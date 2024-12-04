import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #ffffff;
    min-height: 100vh;
    box-sizing: border-box;
`;

export const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin: 40px 0 20px;
    text-align: center; /* 중앙 정렬 */
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: center; /* 버튼 중앙 정렬 */
    margin-top: 30px;
`;

export const Button = styled.button`
    padding: 12px 24px;
    font-size: 1rem;
    color: #ffffff;
    background-color: #007bff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        background-color: #003f7f;
    }
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between; /* 좌우로 배치 */
    align-items: center;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
`;

export const HeaderTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
`;

export const HeaderActions = styled.div`
    display: flex;
    gap: 15px;
`;
