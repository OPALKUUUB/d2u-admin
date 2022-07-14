import React, { useState } from "react";
import DeleteModal from "../MartModal/DeleteModal";
import { ButtonModal } from "../MartModal/ManageModal";
import PropTypes from "prop-types";
import "./Row.css";

function Row({ index, promotion, shop }) {
  const [isHoveringRow, setIsHoveringRow] = useState(false);

  function genTextSelect(select) {
    if (typeof select === "string") {
      return select;
    } else if (typeof select === "object") {
      let temp = "";
      select.forEach((item, i) => {
        if (i > 0) {
          temp += " / ";
        }
        temp += item.label;
      });
      console.log(typeof temp);
      return temp;
    }
    return "-";
  }
  return (
    <tr
      key={[`${shop}-item`, index].join("_")}
      style={{
        backgroundColor: isHoveringRow ? "rgba(0, 0, 0, 0.1)" : "white",
        borderBottom: "2px solid #e5e5e5",
        transition: "ease-in",
        transitionDuration: "200ms",
      }}
      onMouseEnter={() => {
        setIsHoveringRow(true);
      }}
      onMouseLeave={() => {
        setIsHoveringRow(false);
      }}
    >
      <td>{index}</td>
      <td>
        <div
          style={{
            width: "150px",
            height: "150px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            style={{
              position: "absolute",
              width: "150px",
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
      <td>
        <div
          className="Row_box-genText"
          //     style={{
          //       textOverflow: "ellipsis",
          //       width: "200px",
          //       height: "10px",
          //       display: "-webkit-box",
          //       -webkit-box-orient: "vertical",
          // -webkit-line-clamp: 2
          //     }}
        >
          {genTextSelect(promotion.category)}
        </div>
      </td>
      <td>{promotion.price}</td>
      <td>{promotion?.expire_date || "-"}</td>
      <td>{promotion.description}</td>
      <td>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80px",
            paddingRight: "20px",
            gap: "5px",
          }}
        >
          <ButtonModal order={promotion} shop={shop} />
          <DeleteModal order={promotion} shop={shop} />
        </div>
      </td>
    </tr>
  );
}

Row.propTypes = {
  promotion: PropTypes.object.isRequired,
};

export default Row;
