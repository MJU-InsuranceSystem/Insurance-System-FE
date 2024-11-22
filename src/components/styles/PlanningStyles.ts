import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
`;

export const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
    color: #1058a3;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
`;

export const Label = styled.label`
    font-size: 1rem;
    margin-bottom: 5px;
    color: #333;
`;

export const Input = styled.input`
    font-size: 1rem;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

export const TextArea = styled.textarea`
    font-size: 1rem;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
`;

export const FileInput = styled.input`
    font-size: 1rem;
    margin-bottom: 15px;
`;

export const Button = styled.button`
    font-size: 1rem;
    padding: 10px 15px;
    background-color: #1058a3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0d4a85;
    }
`;

export const ErrorText = styled.p`
    font-size: 0.9rem;
    color: red;
    margin-bottom: 15px;
`;

export const LoadingSpinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #1058a3;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 0.8s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const Select = styled.select`
    font-size: 1rem;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;
