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

function App() {
  const { config, PatchConfig } = useContext(DashboardContext);
  return <></>;
}
