import React from "react";
import { TableStyles } from "../../../pages/mart/styles/MartStyles";
import Row from "./Row";

export const Table = ({ promotions, shop }) => {
  return (
    <div className="Table-Container" style={{ padding: "20px" }}>
      <TableStyles>
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
                {promotions.reverse().map((promotion, index) => {
                  index = index + 1;
                  return (
                    <Row
                      key={index}
                      promotion={promotion}
                      index={index}
                      shop={shop}
                    />
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </TableStyles>
    </div>
  );
};
