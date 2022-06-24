import React from "react";
import { Route, Routes } from "react-router-dom";
import { ShipBilling } from "./ShipBilling";
import { App as BillingItem } from "./ShipBillingItem/App";

export const App = () => {
  return (
    <Routes>
      <Route path="" element={<ShipBilling />} />
      <Route path="/manage" element={<BillingItem />} />
    </Routes>
  );
};
