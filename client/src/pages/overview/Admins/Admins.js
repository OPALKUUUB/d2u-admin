import React, { useContext, useState } from "react";
import Card from "../../../components/Card/Card";
import { AdminContext, AdminProvider } from "../../../context/AdminProvider";
import { Filter } from "./component/Filter/Filter";
import { Table } from "./component/Table/Table";
// import styled from "styled-components";
import { AddModal } from "./component/Modal/AddModal";

export const Admins = () => {
  return (
    <AdminProvider>
      <div className="container-fluid mt-3">
        <Card header={true} title="Admins">
          <Filter />
        </Card>
        <AddAdmin />
        <Card>
          {/* <Pagination /> */}
          <Table />
          {/* <Pagination /> */}
        </Card>
      </div>
    </AdminProvider>
  );
};

function AddAdmin() {
  const { role } = useContext(AdminContext);
  const [addModal, setAddModal] = useState(false);
  if (role === "admin") {
    return (
      <div className="d-flex justify-content-end">
        <button
          type="button"
          onClick={() => setAddModal(true)}
          className="btn btn-primary mb-3"
        >
          + Add
        </button>
        <AddModal show={addModal} onHide={() => setAddModal(false)} />
      </div>
    );
  }
}

// const BtnPagination = styled.div`
//   background-color: #ffffff;
//   cursor: pointer;
// `;
// function Pagination() {
//   const { filter, setFilter, handleSearch } = useContext(AdminContext);
//   const handlePrevious = (e) => {
//     setFilter((prev) => {
//       return { ...prev, offset: parseInt(prev.offset) - parseInt(filter.item) };
//     });
//     handleSearch(e);
//   };
//   const handleNext = (e) => {
//     setFilter((prev) => {
//       return { ...prev, offset: parseInt(prev.offset) + parseInt(filter.item) };
//     });
//     handleSearch(e);
//   };
//   return (
//     <div className="d-flex justify-content-between">
//       {filter.offset > 0 && (
//         <BtnPagination onClick={handlePrevious}>{"<<"}</BtnPagination>
//       )}
//       <BtnPagination onClick={handleNext}>{">>"}</BtnPagination>
//     </div>
//   );
// }


