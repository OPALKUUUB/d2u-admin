import React from "react";
import { Filter } from "./component/Filter/Filter";
import { AllProvider } from "../context/AllProvider";
import { CardFilter } from "../All/components/Filter/CardFilter";
import { Card } from "../All/components/Table/Card";
import { Table } from "./component/Table/Table";

export const Mercari = () => {
  return (
    <div className="container-fluid mt-3">
      <AllProvider>
        <CardFilter mode="Mercari">
          <Filter />
        </CardFilter>
        <Card>
          <Table />
        </Card>
      </AllProvider>
    </div>
  );
};
