import React from "react";

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
          </tr>
        </thead>
        <tbody>
          {promotions.length > 0 && (
            <>
              {promotions.map((promotion, index) => {
                index += 1;
                return (
                  <tr key={["Promotioni-tem", index].join("_")}>
                    <th>{index}</th>
                    <td>
                      <div
                        style={{
                          width: "100px",
                          height: "80px",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <img
                          style={{
                            position: "absolute",
                            height: "80px",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                          src={promotion.image}
                          alt={["Promotion-item-image", index].join("_")}
                        />
                      </div>
                    </td>
                    <td>{promotion.name}</td>
                    <td>{promotion.category}</td>
                    <td>{promotion.price}</td>
                    <td>{promotion.description}</td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};
