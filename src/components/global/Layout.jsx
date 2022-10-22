import React from "react";
import styled from "styled-components";
import Header from "./Header";

const LayoutContainer = styled.div`
  max-width: 100%;
  min-width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #fafafa;
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

};

export default Layout;