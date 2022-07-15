import React from "react";

export const Yahoo = ({ order, sum }) => {
  return (
    <>
      {order.length > 0 && (
        <>
          {order.map((row, index) => {
            return (
              <tr style={{ background: "pink" }}>
                <th>{index === 0 && "Yahoo"}</th>
                <td>{row.box_id}</td>
                <td>{row.track_id}</td>
                <td>{row.weight}</td>
                <td>-</td>
                <td>{row.cod}</td>
              </tr>
            );
          })}
          <tr id="sum" style={{ background: "pink" }}>
            <th id="head" colSpan={3}>
              Sum
            </th>
            <td>{sum.weight}</td>
            <td>{sum.price}</td>
            <td></td>
          </tr>
        </>
      )}
    </>
  );
};
