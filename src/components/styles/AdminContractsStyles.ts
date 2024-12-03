import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

export const ContractList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const ContractItem = styled.li`
    border: 1px solid #ddd;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
    }
`;

export const ContractDetails = styled.div`
    font-size: 14px;
    line-height: 1.5;
`;

export const ErrorText = styled.p`
    color: red;
    text-align: center;
`;

export const LoadingSpinner = styled.div`
    text-align: center;
    font-size: 16px;
    color: #555;
`;

export const StatusText = styled.span<{ approveStatus: string }>`
    font-size: 20px; /* 폰트 크기 증가 */
    color: ${({ approveStatus }) =>
        approveStatus === "승인" ? "green" :
        approveStatus === "거부" ? "red" :
        approveStatus === "대기" ? "orange" :
        "black"}; /* 승인 상태에 따라 색상 변경 */
`;
