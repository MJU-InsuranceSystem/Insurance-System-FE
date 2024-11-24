import styled from 'styled-components';

// 기본 컨테이너 스타일
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
`;

// 타이틀 스타일
export const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
`;

// 설명 텍스트 스타일
export const Description = styled.p`
    font-size: 1.2rem;
    margin-bottom: 20px;
    text-align: center;
    color: #555;
`;

// 사고 리스트 컨테이너 스타일
export const AccidentList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    margin: 20px 0;
`;

// 사고 항목 스타일
export const AccidentItem = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f8ff;
    }
`;

// 사고 세부 정보 스타일
export const AccidentDetails = styled.div`
    font-size: 1rem;
    color: #333;
`;

// 오류 텍스트 스타일
export const ErrorText = styled.p`
    color: red;
`;

// 로딩 스피너 스타일
export const LoadingSpinner = styled.div`
    text-align: center;
    font-size: 20px;
`;

// 버튼 스타일 추가
export const Button = styled.button`
    background-color: #1058A3;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 5px 0;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0a3d7a;
    }

    &:focus {
        outline: none;
    }
`;
