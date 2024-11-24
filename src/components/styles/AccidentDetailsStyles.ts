import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`;

export const DetailsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    padding: 20px;
`;

export const DetailsItem = styled.div`
    font-size: 16px;

    p {
        margin: 5px 0;
    }

    a {
        color: #007bff;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const LoadingSpinner = styled.div`
    font-size: 18px;
    color: #007bff;
    text-align: center;
`;

export const ErrorText = styled.div`
    font-size: 18px;
    color: red;
    text-align: center;
`;
