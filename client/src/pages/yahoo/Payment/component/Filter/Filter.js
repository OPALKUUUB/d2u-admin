import React, { useContext } from "react";
import styled from "styled-components";
import { PaymentContext } from "../../../../../context/PaymentProvider";

export const Filter = () => {
  const { filter, setFilter, handleSearch } = useContext(PaymentContext);
  const handleChange = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Styles>
      <form onSubmit={handleSearch}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={filter.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Show</label>
          <select name="item" value={filter.item} onChange={handleChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </form>
    </Styles>
  );
};

const Styles = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;
  }
  form div {
    display: flex;
    column-gap: 20px;
  }
`;
