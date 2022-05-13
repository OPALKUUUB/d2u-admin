import React from "react";
import { OrderProvider } from "../context/OrderProvider";
import { Filter } from "./components/Filter";
import { Table } from "./components/Table";

export const Order = () => {
  return (
    <div className="container-fluid mt-3">
      <OrderProvider>
        <Filter />
        <Table />
      </OrderProvider>
    </div>
  );
};
