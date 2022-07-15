import React from "react";

export const Shimizu = ({ order, sum }) => {
  return (
    <>
      {order.length > 0 && (
        <>
          {order.map((row, index) => {
            return (
              <tr style={{ background: "rgba(0,0,255,0.5)" }}>
                <th>{index === 0 && "Shimizu"}</th>
                <td>{row.box_id}</td>
                <td>{row.track_id}</td>
                <td>{row.weight}</td>
                <td>-</td>
                <td>{row.cod}</td>
              </tr>
            );
          })}
          <tr id="sum" style={{ background: "rgba(0,0,255,0.5)" }}>
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
