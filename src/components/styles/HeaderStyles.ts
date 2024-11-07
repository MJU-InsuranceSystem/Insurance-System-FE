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
`;
