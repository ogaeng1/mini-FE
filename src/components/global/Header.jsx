import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
    width: 100%;
    height: 150px;
    background-color: skyblue;
    text-align: center;
    font-size: 30px;
`;

const Header = () => {
    return (
        <HeaderContainer>헤더임ㅋㅋ</HeaderContainer>
    );
}

export default Header;