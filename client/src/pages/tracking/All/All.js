import React, { useContext, useState } from "react";
import Card from "../../../components/Card/Card";
import Pagination from "../../../components/Pagination/Pagination";
import {
  AllTrackingContext,
  AllTrackingProvider,
} from "../../../context/AllTrackingProvider";
import { Filter } from "./component/Filter/Filter";
import { ExportModal } from "./component/Modal/ExportModal";
import { Table } from "./component/Table/Table";

export const All = () => {
  return (
    <AllTrackingProvider>
      <App />
    </AllTrackingProvider>
  );
};

function App() {
  const { filter, handleNext, handlePrevious } = useContext(AllTrackingContext);
  const [exportModal, setExportModal] = useState(false);
  return (
    <div className="container-fluid mt-3">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h4>All Tracking</h4>
            <button
              className="btn-sm btn-success"
              onClick={() => setExportModal(true)}
            >
              Export
            </button>
            <ExportModal
              show={exportModal}
              onHide={() => setExportModal(false)}
            />
          </div>
        </div>
        <div className="card-body">
          <Filter />
        </div>
      </div>
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
