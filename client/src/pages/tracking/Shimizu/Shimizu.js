import React, { useContext, useState } from "react";
import Card from "../../../components/Card/Card";
import Pagination from "../../../components/Pagination/Pagination";
import {
  AllTrackingContext,
  AllTrackingProvider,
} from "../../../context/AllTrackingProvider";
import { Filter } from "./component/Filter/Filter";
import { ImportCsvModal } from "./component/Modal/ImportCsvModal";
import { Table } from "./component/Table/Table";

export const Shimizu = () => {
  return (
    <AllTrackingProvider>
      <App />
    </AllTrackingProvider>
  );
};

function App() {
  const { filter, handleNext, handlePrevious } = useContext(AllTrackingContext);
  const [importCsvModal, setImportCsvModal] = useState(false);
  return (
    <div className="container-fluid mt-3">
      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setImportCsvModal(true)}
        >
          import csv
        </button>
        <ImportCsvModal
          show={importCsvModal}
          onHide={() => setImportCsvModal(false)}
        />
      </div>
      <Card header={true} title="Shimizu">
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
