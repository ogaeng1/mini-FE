import React from "react";
import styled from "styled-components";
import Header from "./Header";

const LayoutContainer = styled.div`
  max-width: 100%;
  min-width: 100%;
  max-height: 100%;
  min-height: 94vh;
  margin: 54px 0 0 0;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function Layout({ children }) {
  return (
    <>
      <LayoutContainer>
        <Header />
        {children}
      </LayoutContainer>
    </>
  );
}

export default Layout;
