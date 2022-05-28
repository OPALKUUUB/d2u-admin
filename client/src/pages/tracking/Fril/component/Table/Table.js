import React, { useContext } from "react";
import { AllContext } from "../../../context/AllProvider";
import { head_column } from "./headColumn";
import { TableRow } from "./TableRow";

export const Table = () => {
  const { data, filter } = useContext(AllContext);
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {head_column.map((item) => {
              return <th key={item.id}>{item.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i = 0) => {
            let offset = filter.offset === "" ? 0 : parseInt(filter.offset);
            let index = offset + 1 + i;
            return <TableRow key={item.id} item={item} index={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
