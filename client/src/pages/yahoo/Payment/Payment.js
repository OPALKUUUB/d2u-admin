import React, { useContext } from "react";
import Card from "../../../components/Card/Card";
import Pagination from "../../../components/Pagination/Pagination";
import {
  PaymentContext,
  PaymentProvider,
} from "../../../context/PaymentProvider";
import { Filter } from "./component/Filter/Filter";
import { Table } from "./component/Table/Table";

export const Payment = () => {
  return (
    <PaymentProvider>
      <App />
    </PaymentProvider>
  );
};

function App() {
  const { filter, handleNext, handlePrevious } = useContext(PaymentContext);
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
