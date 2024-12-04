import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 상단, 중앙, 하단 분산 */
    min-height: 100vh; /* 화면 전체 높이 */
    padding: 40px 20px; /* 여백 추가 */
    background-color: #ffffff; /* 배경 흰색 */
    box-sizing: border-box;
`;

export const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin: 0 0 40px 0; /* 아래쪽 여백 추가 */
    text-align: center; /* 중앙 정렬 */
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    padding: 20px;
    margin: -100px auto 0 auto; /* 위로 올리기 */
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    box-sizing: border-box;
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
    color: #444;
    text-align: left; /* 왼쪽 정렬 */
`;

export const Input = styled.input`
    margin-bottom: 16px;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #007bff; /* 포커스 시 파란색 */
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    }
`;

export const Button = styled.button`
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        background-color: #003f7f;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

export const ErrorText = styled.p`
    color: red;
    font-size: 14px;
    text-align: center; /* 중앙 정렬 */
    margin-bottom: 16px;
`;

export const SuccessMessage = styled.p`
    color: green;
    font-size: 14px;
    text-align: center; /* 중앙 정렬 */
    margin-bottom: 16px;
`;
