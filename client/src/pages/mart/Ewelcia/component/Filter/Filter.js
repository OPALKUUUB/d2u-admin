import React from "react";
import { ButtonModal } from "../../../../../components/MartModal/AddModal";

const Filter = ({ setShow }) => {
  return (
    <div>
      <ButtonModal shop="ewelcia" />
      <div id="filter">
        <select onChange={(e) => setShow(e.target.value)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
