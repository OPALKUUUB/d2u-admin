import React, { useContext } from "react";
import Card from "../../../components/Card/Card";
import Pagination from "../../../components/Pagination/Pagination";
import { OrderContext, OrderProvider } from "../../../context/OrderProvider";
import { Filter } from "./component/Filter/Filter";
import { Table } from "./component/Table/Table";

export const Order = () => {
  return (
    <OrderProvider>
      <App />
    </OrderProvider>
  );
};

function App() {
  const { filter, handleNext, handlePrevious } = useContext(OrderContext);
  return (
    <div className="container-fluid mt-3">
      <Card header={true} title="Yahoo / Bidding">
        <Filter />
      </Card>
      <Card>
        <Pagination
          filter={filter}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
        <Table />
        <Pagination
          filter={filter}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </Card>
    </div>
  );
}
