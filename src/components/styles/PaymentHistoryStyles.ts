import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: #1058a3;
`;

export const PaymentList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const PaymentItem = styled.li`
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f9f9f9;

    p {
        margin: 5px 0;
    }
`;

export const LoadingSpinner = styled.div`
    text-align: center;
    font-size: 18px;
    color: #555;
`;

export const ErrorText = styled.div`
    text-align: center;
    color: red;
    font-size: 16px;
    margin-top: 20px;
`;
