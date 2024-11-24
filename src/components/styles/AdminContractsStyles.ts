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
