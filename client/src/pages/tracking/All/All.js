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
export function Pagination() {
  const { filter, handleNext, handlePrevious } = useContext(AllContext);
  return (
    <div className="d-flex justify-content-between">
      {filter.offset > 0 && (
        <BtnPagination onClick={handlePrevious}>{"<<"}</BtnPagination>
      )}
      <BtnPagination onClick={handleNext}>{">>"}</BtnPagination>
    </div>
  );
}
