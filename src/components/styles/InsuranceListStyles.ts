import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: #1058a3;
`;

export const InsuranceListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const InsuranceItem = styled.div`
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
`;

export const InsuranceName = styled.h2`
    margin: 0;
    color: #333;
`;

export const InsuranceDetails = styled.div`
    margin-top: 10px;
    color: #555;

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
    font-size: 20px;
    color: #1058a3;
`;

// Add the export for DetailButton here
export const DetailButton = styled.button`
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #0056b3;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 3px 2px rgba(0, 91, 187, 0.5);
    }

    &:active {
        background-color: #004494;
    }
`;
