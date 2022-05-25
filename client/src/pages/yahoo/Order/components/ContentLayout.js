import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  margin-left: ${(props) => (props.active ? "250px" : "0")};
  transition: 350ms;
`;
export const ContentLayout = ({ children, sidebar }) => {
  return <Layout active={sidebar}>{children}</Layout>;
};
