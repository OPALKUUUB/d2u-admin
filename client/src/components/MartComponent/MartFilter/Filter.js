import React from "react";
import { ButtonModal } from "../MartModal/AddModal";


const Filter = ({ setShow , shop}) => {
  return (
    <div style={{width:'100%' , display:'flex' , alignItems:'center' , gap:'20px' , paddingTop:'20px' , paddingLeft:'20px'}}>
      <ButtonModal shop={shop} />
      <div id="filter">
        <select onChange={(e) => setShow(e.target.value)}
          class="form-select" aria-label=".form-select-lg example"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;