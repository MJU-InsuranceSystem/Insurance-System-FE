import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    background-color: #ffffff;
    padding: 20px;
`;

export const Card = styled.div`
    background: #ffffff;
    padding: 40px;
    border-radius: 10px;
    width: 400px;
    box-sizing: border-box;
    text-align: center;
`;

export const Title = styled.h2`
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
    color: black;
    font-size: 24px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid #767676;
    background-color: transparent;
    color: #767676;
    outline: none;
    &::placeholder {
        color: #767676;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #1058A3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #084a83;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const RegisterButton = styled(Button)`
    background-color: transparent;
    color: black;
    border: 1px solid #767676;
    margin-top: 20px;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const ErrorMessage = styled.div`
    color: #ff6b6b;
    font-size: 12px;
    margin-top: -15px;
    margin-bottom: 10px;
`;
