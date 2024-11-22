import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

export const PlanList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const PlanItem = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background-color: #f9f9f9;
    text-align: left;
`;

export const PlanTitle = styled.h2`
    font-size: 18px;
    margin-bottom: 10px;
`;

export const PlanDetails = styled.div`
    font-size: 14px;
`;

export const ErrorText = styled.p`
    color: red;
    font-size: 16px;
`;

export const LoadingSpinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const Button = styled.button`
    margin-top: 10px;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const Select = styled.select`
    margin-top: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const Textarea = styled.textarea`
    margin-top: 10px;
    width: 100%;
    height: 80px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
`;

export const StatusMessage = styled.p`
    margin-top: 10px;
    font-size: 16px;
    color: green;
    font-weight: bold;
`;
