import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

export const ContractList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const ContractItem = styled.li`
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 15px;
    padding: 15px;
`;

export const ContractDetails = styled.div`
    margin-top: 10px;

    p {
        margin: 5px 0;
    }
`;

export const ErrorText = styled.p`
    color: red;
    text-align: center;
`;

export const LoadingSpinner = styled.div`
    text-align: center;
    font-size: 18px;
`;
