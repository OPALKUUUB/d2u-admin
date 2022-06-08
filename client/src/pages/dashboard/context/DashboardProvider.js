import React, { createContext } from "react";

export const DashboardContext = createContext();
export const DashboardProvider = ({ children }) => {
  return (
    <DashboardContext.Provider value={{ test: "test" }}>
      {children}
    </DashboardContext.Provider>
  );
};
