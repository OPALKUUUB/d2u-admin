import React, { useContext } from "react";
import Card from "../../../components/Card/Card";
import Pagination from "../../../components/Pagination/Pagination";
import {
  AllTrackingContext,
  AllTrackingProvider,
} from "../../../context/AllTrackingProvider";
import { Filter } from "./component/Filter/Filter";
import { Table } from "./component/Table/Table";

export const Mercari = () => {
  return (
    <AllTrackingProvider>
      <App />
    </AllTrackingProvider>
  );
};

function App() {
  const { filter, handleNext, handlePrevious } = useContext(AllTrackingContext);
  return (
    <div className="container-fluid mt-3">
      <Card header={true} title="Mercari">
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
