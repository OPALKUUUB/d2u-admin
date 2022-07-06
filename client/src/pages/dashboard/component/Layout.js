import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
`;
export const Layout = ({ children }) => {
  return <Styles>{children}</Styles>;
};
