import React from "react";
import { PaymentProvider } from "../../../context/PaymentProvider";
import { Filter } from "./components/Filter";
import { Table } from "./components/Table";

export const Payment = () => {
  return (
    <div className="container-fluid mt-3">
      <PaymentProvider>
        <Filter />
        <Table />
      </PaymentProvider>
    </div>
  );
};
