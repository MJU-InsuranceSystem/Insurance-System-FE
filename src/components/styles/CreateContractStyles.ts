import styled from 'styled-components';

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin: 10px 0 5px;
`;

export const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const Button = styled.button`
    padding: 10px;
    margin-top: 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

export const ErrorText = styled.p`
    color: red;
    font-weight: bold;
`;

export const SuccessMessage = styled.p`
    color: green;
    font-weight: bold;
`;
