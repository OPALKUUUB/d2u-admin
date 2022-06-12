import React, { useContext } from "react";
import {
  DashboardContext,
  DashboardProvider,
} from "./context/DashboardProvider";
import styled from "styled-components";

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <App />
    </DashboardProvider>
  );
};

const Styles = styled.div`
  margin: 20px;
  padding: 20px 25px;
  background-color: #fff;
  border-radius: 10px;
`;

function App() {
  const { config, PatchConfig } = useContext(DashboardContext);
  return (
    <Styles>
      <div id="section-yen">
        <div className="input-group mb-3">
          <span className="input-group-text">¥</span>
          <input
            type="text"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
          />
          <span className="input-group-text"></span>
        </div>
      </div>
      <div id="seciton-atm">atm config section</div>
    </Styles>
  );
}
