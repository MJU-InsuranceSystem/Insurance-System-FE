import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: #1058a3;
`;

export const InsuranceDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

export const DetailItem = styled.div`
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    margin: 5px 0;

    & span {
        font-weight: bold;
    }
`;

export const ErrorText = styled.p`
    color: red;
    text-align: center;
    font-size: 16px;
`;

export const LoadingSpinner = styled.div`
    text-align: center;
    font-size: 20px;
    color: #1058a3;
`;

// 보험 계약 생성 버튼 스타일 추가
export const Button = styled.button`
    padding: 10px 20px;
    background-color: #28a745; /* 버튼 배경색 */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;

    &:hover {
        background-color: #218838; /* 버튼 호버 시 색상 변화 */
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
    }

    &:active {
        background-color: #1e7e34;
    }
`;
