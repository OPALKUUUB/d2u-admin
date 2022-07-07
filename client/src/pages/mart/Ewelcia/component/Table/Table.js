import React from "react";
import Row from "./Row";

export const Table = ({ promotions }) => {
  return (
    <div className="Table-Container">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {promotions.length > 0 && (
            <>
              {promotions.map((promotion, index) => {
                index = index + 1;
                return (
                  <Row promotion={promotion} index={index}/>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};
