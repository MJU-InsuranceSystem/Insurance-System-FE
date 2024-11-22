import styled from 'styled-components';

export const SignUpWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 40px 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
    max-width: 800px;
    margin: 0 auto;
    box-sizing: border-box;
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 26px;
    color: #333333;
    margin-bottom: 20px;
    & span {
        color: #0b79d0;
        font-weight: bold;
    }
`;

export const Input = styled.input`
    width: 100%;
    max-width: 700px;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    background-color: #ffffff;
    color: #333333;
    outline: none;
    &::placeholder {
        color: #a3a3a3;
    }
    &:focus {
        border-color: #0b79d0;
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    background-color: #ffffff;
    color: #333333;
    outline: none;
    font-size: 14px;
`;

export const Button = styled.button`
    width: 100%;
    padding: 15px;
    background-color: #0b79d0;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: background-color 0.3s;
    &:hover {
        background-color: #095a9e;
    }
`;

export const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
`;

export const Checkbox = styled.input`
    margin-right: 8px;
`;

export const CheckboxLabel = styled.label`
    font-size: 14px;
    color: #333333;
`;

export const ErrorMessage = styled.div`
    color: red;
    font-size: 12px;
    margin-top: 5px;
    text-align: left;
`;
