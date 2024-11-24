import styled from 'styled-components';

// 기본 컨테이너 스타일
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
`;

// 타이틀 스타일
export const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`;

// 사고 세부 정보 스타일
export const AccidentDetails = styled.div`
    font-size: 1.2rem;
    margin-bottom: 20px;
`;

// 면책/부책 폼 스타일
export const LiabilityForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
`;

// 입력 필드 스타일
export const Input = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

// 버튼 스타일
export const Button = styled.button`
    padding: 10px;
    background-color: #1058A3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0e4b8c;
    }
`;

// 오류 텍스트 스타일
export const ErrorText = styled.p`
    color: red;
`;

// 성공 텍스트 스타일
export const SuccessText = styled.p`
    color: green;
`;
