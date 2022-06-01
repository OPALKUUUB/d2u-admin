import React, { useContext } from "react";
import Card from "../../../components/Card/Card";
import { UserContext, UserProvider } from "../../../context/UserProvider";
import { Filter } from "./component/Filter/Filter";
import { Table } from "./component/Table/Table";
import styled from "styled-components";

export const Users = () => {
  return (
    <UserProvider>
      <div className="container-fluid mt-3">
        <Card header={true} title="Users">
          <Filter />
        </Card>
        <Card>
          <Pagination />
          <Table />
          <Pagination />
        </Card>
      </div>
    </UserProvider>
  );
};

const BtnPagination = styled.div`
  background-color: #ffffff;
  cursor: pointer;
`;
function Pagination() {
  const { filter, setFilter, handleSearch } = useContext(UserContext);
  const handlePrevious = (e) => {
    setFilter((prev) => {
      return { ...prev, offset: parseInt(prev.offset) - parseInt(filter.item) };
    });
    handleSearch(e);
  };
  const handleNext = (e) => {
    setFilter((prev) => {
      return { ...prev, offset: parseInt(prev.offset) + parseInt(filter.item) };
    });
    handleSearch(e);
  };
  return (
    <div className="d-flex justify-content-between">
      {filter.offset > 0 && (
        <BtnPagination onClick={handlePrevious}>{"<<"}</BtnPagination>
      )}
      <BtnPagination onClick={handleNext}>{">>"}</BtnPagination>
    </div>
  );
}
