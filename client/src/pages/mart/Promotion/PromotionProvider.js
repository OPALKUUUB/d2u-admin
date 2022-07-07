import React, { createContext, useEffect, useState } from "react";
import { generate_promotion } from "./component/Table/table_data";

export const PromotionContext = createContext();
export const PromotionProvider = ({ children }) => {
  // useSearchParams
  const [promotions, setPromotions] = useState(generate_promotion());
  const [show, setShow] = useState(10);
  useEffect(() => {
    setPromotions(generate_promotion(show));
  }, [show]);
  return (
    <PromotionContext.Provider
      value={{ promotions: promotions, setShow: setShow }}
    >
      {children}
    </PromotionContext.Provider>
  );
};
