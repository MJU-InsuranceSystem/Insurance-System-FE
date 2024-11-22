import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background-color: #f9f9f9;
    min-height: 100vh;
`;

export const Title = styled.h1`
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
`;

export const Input = styled.input`
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const TextArea = styled.textarea`
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
`;

export const Select = styled.select`
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const FileInput = styled.input`
    margin-bottom: 15px;
`;

export const Button = styled.button`
    padding: 12px;
    background-color: #1058A3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover {
        background-color: #084a83;
    }
`;

export const SuccessMessage = styled.div`
    color: #28a745;
    margin-bottom: 15px;
`;

export const ErrorMessage = styled.div`
    color: #ff6b6b;
    margin-bottom: 15px;
`;
