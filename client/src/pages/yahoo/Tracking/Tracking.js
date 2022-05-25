import React from "react";
import { TrackingProvider } from "../../../context/TrackingProvider";
import { Filter } from "./components/Filter";
import { Table } from "./components/Table";

export const Tracking = () => {
  return (
    <div className="container-fluid mt-3">
      <TrackingProvider>
        <Filter />
        <Table />
      </TrackingProvider>
    </div>
  );
};
