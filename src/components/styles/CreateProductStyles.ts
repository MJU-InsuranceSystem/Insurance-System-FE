import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
`;

export const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const Label = styled.label`
    font-size: 16px;
    margin-bottom: 5px;
`;

export const Input = styled.input`
    padding: 10px;
    font-size: 14px;
`;

export const TextArea = styled.textarea`
    padding: 10px;
    font-size: 14px;
`;

export const Select = styled.select`
    padding: 10px;
    font-size: 14px;
`;

export const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;

    &:disabled {
        background-color: #ccc;
    }
`;

export const ErrorText = styled.div`
    color: red;
    font-size: 14px;
`;

export const LoadingSpinner = styled.div`
    border: 3px solid #f3f3f3;
    border-radius: 50%;
    border-top: 3px solid #3498db;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
