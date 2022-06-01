import React, { useContext } from "react";
import styled from "styled-components";
import { AllContext, AllProvider } from "../context/AllProvider";
import { CardFilter } from "./components/Filter/CardFilter";
import { Filter } from "./components/Filter/Filter";
import { Card } from "./components/Table/Card";
import { Table } from "./components/Table/Table";

export const All = () => {
  return (
    <div className="container-fluid mt-3">
      <AllProvider>
        <CardFilter>
          <Filter />
        </CardFilter>
        <Card>
          <Pagination />
          <Table />
          <Pagination />
        </Card>
      </AllProvider>
    </div>
  );
};

const BtnPagination = styled.div`
  background-color: #ffffff;
  cursor: pointer;
`;
function Pagination() {
  const { filter, setFilter, search } = useContext(AllContext);
  const handlePrevious = (e) => {
    setFilter((prev) => {
      let t = parseInt(prev.offset) - parseInt(filter.item);
      return { ...prev, offset: t };
    });
    search();
  };
  const handleNext = (e) => {
    setFilter((prev) => {
      let t = parseInt(prev.offset) + parseInt(filter.item);
      return { ...prev, offset: t };
    });
    search();
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
