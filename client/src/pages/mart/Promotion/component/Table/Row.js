import React from "react";
import { ButtonModal } from "../../../../../components/MartModal/ManageModal";

function Row({ index, promotion }) {
  return (
    <tr key={["Promotion-item", index].join("_")}>
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
      <td>
        <ButtonModal order={promotion} shop="promotion" />
      </td>
    </tr>
  );
}

export default Row;
