import React from "react";
import styled from "styled-components";

export const Atm = ({ name, no, qr }) => {
  return (
    <Styles>
      {/* <img src={qr} alt="qr code for billing" /> */}
      <img src="/qr.png" alt="qr code for billing" />
      <p>name: {name}</p>
      <p>no.: {no}</p>
    </Styles>
  );
};

const Styles = styled.div`
  border: 1px solid blue;
`;
