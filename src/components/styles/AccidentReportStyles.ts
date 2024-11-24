import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
`;

export const Title = styled.h1`
    text-align: center;
    color: #1058a3;
    margin-bottom: 20px;
`;

export const Form = styled.form`
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-weight: bold;
`;

export const Input = styled.input`
    margin-bottom: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const TextArea = styled.textarea`
    margin-bottom: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
`;

export const Select = styled.select`
    margin-bottom: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const FileInput = styled.input`
    margin-bottom: 16px;
`;

export const Button = styled.button`
    background-color: #1058a3;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #0b4175;
    }
`;

export const ErrorText = styled.div`
    color: red;
    text-align: center;
    margin-bottom: 16px;
`;

export const SuccessMessage = styled.div`
    color: green;
    text-align: center;
    margin-bottom: 16px;
`;
