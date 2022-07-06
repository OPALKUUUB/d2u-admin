import React from "react";

export const Table = () => {
  return (
    <div className="Table-Container">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background: "red",
                }}
              />
            </td>
            <td>red box</td>
            <td>5000 yen</td>
            <td>this box is red!</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
