import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #f9f9f9;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #555;
`;

export const Input = styled.input`
    margin-bottom: 16px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
`;

export const Button = styled.button`
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        background-color: #003f7f;
    }
`;

export const ErrorText = styled.p`
    color: red;
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
`;

export const SuccessMessage = styled.p`
    color: green;
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
`;
