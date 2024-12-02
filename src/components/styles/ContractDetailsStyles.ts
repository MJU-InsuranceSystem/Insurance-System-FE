import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

export const DetailsSection = styled.div`
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
`;

export const DetailsItem = styled.p`
    margin: 5px 0;
    font-size: 14px;
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

export const Button = styled.button`
    margin-top: 10px;
    margin-right: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }
`;