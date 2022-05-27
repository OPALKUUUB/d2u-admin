import React from "react";
import { AllProvider } from "../context/AllProvider";
import { CardFilter } from "./components/Filter/CardFilter";
import { Filter } from "./components/Filter/Filter";
import { CardTable } from "./components/Table/CardTable";
import { Table } from "./components/Table/Table";
// import { Pagination } from "./components/Pagination/Pagination";

export const All = () => {
  return (
    <div className="container-fluid mt-3">
      <AllProvider>
        <CardFilter>
          <Filter />
        </CardFilter>
        <CardTable>
          <Table />
        </CardTable>
      </AllProvider>
    </div>
  );
};
