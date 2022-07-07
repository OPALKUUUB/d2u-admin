import React from "react";
import Row from "./Row";
import Styles from "./Styles";

export const Table = ({ promotions }) => {
  return (
    <Styles>
      <table className="Table">
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
                return <Row key={index} promotion={promotion} index={index} />;
              })}
            </>
          )}
        </tbody>
      </table>
    </Styles>
  );
};
