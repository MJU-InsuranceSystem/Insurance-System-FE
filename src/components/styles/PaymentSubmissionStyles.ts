import styled from "styled-components";

export const Container = styled.div`
    background-color: #ffffff;
    text-align: center;
    padding: 40px 20px;
`;

// 타이틀 스타일
export const Title = styled.h1`
    color: #000000; /* 검정색 텍스트 */
    font-size: 26px;
    margin: 0;
    white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정 */
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center; /* 자식 요소들을 수평으로 가운데 정렬 */
    width: 100%;
    max-width: 400px;
    margin: 0 auto; /* 가운데 정렬을 위한 자동 마진 */
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #555;
`;

export const Input = styled.input`
    margin-bottom: 16px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
`;

export const Button = styled.button`
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        background-color: #003f7f;
    }
`;

export const ErrorText = styled.p`
    color: red;
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
`;

export const SuccessMessage = styled.p`
    color: green;
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
`;
