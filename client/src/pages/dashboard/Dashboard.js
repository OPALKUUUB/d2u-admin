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
          <span className="input-group-text">¥ (exchange)</span>
          <input
            type="text"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Save
          </button>
        </div>
      </div>
      <div id="seciton-atm">
        <div className="col mb-3">
          <label className="me-3">atm no.</label>
          <input />
        </div>
        <div className="col mb-3">
          <label className="me-3">atm name</label>
          <input />
        </div>
        <div className="col mb-3">
          <label className="me-3">atm Qr.</label>
          <input type="file" />
        </div>
        <button>Save</button>
      </div>
    </Styles>
  );
}
