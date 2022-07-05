import React from "react";
import App from "./App";
import { DashboardProvider } from "./context/DashboardProvider";

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <App />
    </DashboardProvider>
  );
};
