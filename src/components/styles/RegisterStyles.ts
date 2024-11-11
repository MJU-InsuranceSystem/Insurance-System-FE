import styled from 'styled-components';

export const SignUpWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 40px 20px;
    background-color: #f9f9f9; /* 약간 밝은 배경색으로 변경 */
    min-height: 100vh;
    max-width: 800px; /* 고정된 너비 */
    margin: 0 auto; /* 중앙 정렬 */
    box-sizing: border-box;
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 26px; /* 더 큰 폰트 크기 */
    color: #333333;
    margin-bottom: 20px;
    & span {
        color: #0b79d0; /* 강조된 텍스트 색상 변경 */
        font-weight: bold;
    }
`;

export const Input = styled.input`
    width: 100%;
    max-width: 700px;
    padding: 12px; /* 더 두꺼운 패딩 */
    margin-bottom: 20px;
    border: 1px solid #d1d1d1; /* 경계색 추가 */
    border-radius: 4px; /* 경계 반경 추가 */
    background-color: #ffffff; /* 흰색 배경 */
    color: #333333;
    outline: none;
    &::placeholder {
        color: #a3a3a3;
    }
    &:focus {
        border-color: #0b79d0; /* 포커스 시 경계색 */
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
    background-color: #0b79d0; /* 파란색 버튼 */
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
    text-align: left; /* 에러 메시지 왼쪽 정렬 */
`;
