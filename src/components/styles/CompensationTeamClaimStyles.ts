import styled from 'styled-components';

// 전체 컨테이너
export const Container = styled.div`
    background-color: #ffffff;
    text-align: center;
    padding: 40px 20px;
`;

// 타이틀 스타일
export const Title = styled.h1`
    color: #000000;
    font-size: 26px;
    margin: 0;
`;

// 테이블 스타일
export const Table = styled.table`
    width: 100%;
    max-width: 600px;
    border-collapse: collapse;
    margin: 20px auto;  // 수평 중앙 정렬

    th, td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
    }

    th {
        background-color: #e9ecef;
        font-weight: bold;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

// 오류 텍스트 스타일
export const ErrorText = styled.p`
    color: red;
    margin-top: 20px;
`;

// 로딩 스피너 스타일
export const LoadingSpinner = styled.div`
    text-align: center;
    font-size: 20px;
`;
