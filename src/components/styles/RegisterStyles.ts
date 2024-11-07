import styled from 'styled-components';

export const SignUpWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 40px 20px;
    background-color: #ffffff;
    min-height: 100vh;
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 24px;
    color: black;
    margin-bottom: 30px;
    & span {
        color: #1058A3;
        font-weight: bold;
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid #767676;
    background-color: transparent;
    color: #767676;
    outline: none;
    &::placeholder {
        color: #767676;
    }
`;

export const RadioGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    width: 100%;
`;

export const RadioButton = styled.button<{ active: boolean }>`
    flex: 1;
    padding: 10px;
    background-color: ${(props) => (props.active ? '#1058A3' : '#333333')};
    color: white;
    border: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
    transition: background-color 0.3s;
    &:not(:last-child) {
        margin-right: 5px;
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #767676;
    background-color: white;
    color: #767676;
    outline: none;
    font-size: 14px;
`;

export const Button = styled.button`
    width: 100%;
    padding: 15px;
    background-color: #1058A3;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: background-color 0.3s;
    &:hover {
        background-color: #08457E;
    }
`;

export const ConsentText = styled.div`
    margin-top: 10px;
    font-size: 12px;
    color: #767676;
    line-height: 1.5;
`;

export const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 15px;
`;

export const Checkbox = styled.input`
    margin-right: 10px;
`;

export const CheckboxLabel = styled.label`
    font-size: 14px;
    color: #767676;
`;

// 에러 메시지 스타일
export const ErrorMessage = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
`;
