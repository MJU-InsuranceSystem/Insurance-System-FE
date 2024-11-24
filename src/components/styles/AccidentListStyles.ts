import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
`;

export const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

export const AccidentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const AccidentItem = styled.div`
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 8px;
`;

export const AccidentDetails = styled.div`
    font-size: 16px;

    p {
        margin: 5px 0;
    }
`;

export const LoadingSpinner = styled.div`
    font-size: 18px;
    color: #007bff;
`;

export const ErrorText = styled.div`
    font-size: 18px;
    color: red;
`;
