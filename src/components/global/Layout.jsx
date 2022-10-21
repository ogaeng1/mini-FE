import React from "react";
import styled from "styled-components";
import Header from "./Header";

const LayoutContainer = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  padding: 10px 0px;
`;

function Layout({ children }) {
  return (
    <>
      <Header />
      <LayoutContainer>{children}</LayoutContainer>
    </>
  );

};

export default Layout;