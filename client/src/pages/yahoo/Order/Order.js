import React from "react";
import Card from "../../../components/Card/Card";
import { OrderProvider } from "../../../context/OrderProvider";
import { Filter } from "./component/Filter/Filter";
import { Table } from "./component/Table/Table";

export const Order = () => {
  return (
    <OrderProvider>
      <div className="container-fluid mt-3">
        <Card header={true} title="Yahoo / Bidding">
          <Filter />
        </Card>
        <Card>
          <Table />
        </Card>
      </div>
    </OrderProvider>
  );
};
