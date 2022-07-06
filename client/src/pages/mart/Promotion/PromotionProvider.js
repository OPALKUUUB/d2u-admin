import React, { createContext } from "react";

export const PromotionContext = createContext();
export const PromotionProvider = ({ children }) => {
  return (
    <PromotionContext.Provider value={{ test: "test" }}>
      {children}
    </PromotionContext.Provider>
  );
};
