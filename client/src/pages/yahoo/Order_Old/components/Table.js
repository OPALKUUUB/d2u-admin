import React, { useContext } from "react";
import { OrderContext } from "../../../../context/OrderProvider";
import { TableData } from "./TableData";
import styled from "styled-components";

export const Table = () => {
  const { data } = useContext(OrderContext);
  return (
    <div className="card">
      <div className="card-body">
        <Pagination />
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {THEAD.map((head, index) => {
                  return (
                    <th scope="col" key={index}>
                      {head}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableData item={item} index={index} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const THEAD = [
  "#",
  "Date",
  "Order",
  "Username",
  "Link",
  "Maxbid",
  "Addbid1",
  "Addbid2",
  "User Noted",
  "Admin Noted",
  "Manage",
];

const BtnPagination = styled.div`
  background-color: #ffffff;
  cursor: pointer;
`;

function Pagination() {
  const { filter, setFilter, handleSearch } = useContext(OrderContext);
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
