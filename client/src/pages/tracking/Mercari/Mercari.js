import React, { useContext } from "react";
import { Filter } from "./component/Filter/Filter";
import { AllContext, AllProvider } from "../context/AllProvider";
import { CardFilter } from "../All/components/Filter/CardFilter";
import { Card } from "../All/components/Table/Card";
import { Table } from "./component/Table/Table";
import styled from "styled-components";

export const Mercari = () => {
  return (
    <div className="container-fluid mt-3">
      <AllProvider>
        <CardFilter mode="Mercari">
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
