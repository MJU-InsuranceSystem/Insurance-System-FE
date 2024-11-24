import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
    background-color: #f9f9f9;
    padding: 20px;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 30px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 20px;
`;

export const Button = styled.button`
    padding: 12px 24px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        background-color: #003f7f;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 5px 2px rgba(0, 123, 255, 0.5);
    }
`;
