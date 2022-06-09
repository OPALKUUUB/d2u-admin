import React, { createContext, useMemo } from "react";

export const AllMartContext = createContext();
export const AllMartProvider = ({ children }) => {
  return (
    <AllMartContext.Provider value={"test"}>{children}</AllMartContext.Provider>
  );
};
