import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    color: #fff;
    padding: 10px;
`;

export const ImageWrapper = styled.div`
    img {
        height: 40px;
        width: auto;
    }
`;

export const AuthButtons = styled.div`
    display: flex;
    align-items: center; /* 추가: 버튼과 이메일을 수직 정렬 */
    gap: 10px;

    button {
        background-color: white;
        color: black;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 3px;

        &:hover {
            background-color: #777;
        }
    }

    span {
        color: #1058A3; /* 이메일 색상 추가 */
        font-weight: bold; /* 이메일 강조를 위한 굵게 설정 */
    }
`;
