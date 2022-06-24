import React, { createContext } from "react";

export const ShipBillingContext = createContext();
export const ShipBillingProvider = ({ children }) => {
  return (
    <ShipBillingContext.Provider value={{ test: "test" }}>
      {children}
    </ShipBillingContext.Provider>
  );
};
