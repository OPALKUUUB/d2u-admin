import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <Styles>{children}</Styles>;
};

const Styles = styled.div`
  width: 90vw;
  margin: 0 auto;
`;
export default Layout;
