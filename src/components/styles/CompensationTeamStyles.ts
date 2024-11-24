import styled from 'styled-components';

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

export const Button = styled.button`
    margin: 15px;
    padding: 12px 25px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
        background-color: #0056b3;
        transform: scale(1.05);
    }
`;

export const AccidentList = styled.div`
    margin-top: 20px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
`;

export const AccidentItem = styled.div`
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const AccidentDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const ErrorText = styled.p`
    color: red;
    font-weight: bold;
`;

export const SuccessMessage = styled.p`
    color: green;
    font-weight: bold;
`;

export const LoadingSpinner = styled.div`
    font-size: 20px;
    color: #007bff;
`;

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


export const Select = styled.select`
    font-size: 1rem;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

