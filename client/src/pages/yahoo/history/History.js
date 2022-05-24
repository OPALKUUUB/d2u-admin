import React from "react";
import { HistoryProvider } from "../../../context/HistoryProvider";
import { Filter } from "./components/Filter";
import { Table } from "./components/Table";

export const History = () => {
  return (
    <div className="container-fluid mt-3">
      <HistoryProvider>
        <Filter />
        <Table />
      </HistoryProvider>
    </div>
  );
};
