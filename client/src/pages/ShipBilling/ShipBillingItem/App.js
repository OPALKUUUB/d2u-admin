import React from "react";
import { ShipBillingItem } from "./ShipBillingItem";
import { ShipBillingItemProvider } from "./ShipBillingItemProvider";

export const App = () => {
  return (
    <ShipBillingItemProvider>
      <ShipBillingItem />
    </ShipBillingItemProvider>
  );
};
