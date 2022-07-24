import React from "react";

export const Mercari = ({ order }) => {
  return (
    <>
      {order.length > 0 && (
        <>
          {order.map((row, index) => {
            let price = 0;
            let weight = parseFloat(row.weight);
            weight = Math.round(weight * 100) / 100;
            let weight_cal = weight;
            if (weight < 1) {
              price = 0;
              weight_cal = 0;
            } else {
              weight_cal -= 1;
              weight_cal = Math.round(weight_cal * 100) / 100;
              price = weight_cal * 200;
              price = Math.ceil(price * 100) / 100;
              price = price.toFixed(2);
              weight = weight.toFixed(2);
            }
            return (
              <tr style={{ background: "#ffb6c1" }}>
                <th>{index === 0 && "Mercari"}</th>
                <td>{row.box_id}</td>
                <td>{row.track_id}</td>
                <td>{weight}</td>
                <td>{price}</td>
                <td>{row.cod}</td>
              </tr>
            );
          })}
        </>
      )}
    </>
  );
};
