import React from "react";
import { HistoryProvider } from "../../../context/HistoryProvider";
import { Filter } from "./components/Filter";
import { Table } from "./components/Table";

export const History = () => {
  return (
    <HistoryProvider>
      <div className="container-fluid mt-3">
        <Filter />
        <Table />
      </div>
    </HistoryProvider>
  );
};
