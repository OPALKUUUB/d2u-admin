import React from "react";
import { App } from "./App";
import { PromotionProvider } from "./PromotionProvider";

const Promotion = () => {
  return (
    <PromotionProvider>
      <App />
    </PromotionProvider>
  );
};

export default Promotion;
