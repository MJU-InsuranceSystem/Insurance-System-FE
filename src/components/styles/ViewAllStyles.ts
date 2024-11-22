// ViewAllStyles.ts
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
`;

export const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
    color: #1058a3;
`;

export const Description = styled.p`
    font-size: 1rem;
    margin-bottom: 20px;
    color: #333;
`;

export const PlanList = styled.ul`
    list-style: none;
    padding: 0;
    width: 100%;
    max-width: 800px;
`;

export const PlanItem = styled.li`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 15px;
    background-color: #fff;
`;

export const PlanTitle = styled.h2`
    font-size: 1.5rem;
    color: #1058a3;
    margin-bottom: 10px;
`;

export const PlanDetails = styled.div`
    font-size: 1rem;
    color: #555;
    & > p {
        margin: 5px 0;
    }
`;

export const ErrorText = styled.p`
    font-size: 0.9rem;
    color: red;
    text-align: center;
`;

export const LoadingSpinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #1058a3;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s linear infinite;
    margin: 50px auto;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
