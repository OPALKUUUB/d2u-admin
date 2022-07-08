import React, { useState } from "react";
import DeleteModal from "../MartModal/DeleteModal";
import { ButtonModal } from "../MartModal/ManageModal";

function Row({ index, promotion , shop }) {
  const [isHoveringRow, setIsHoveringRow] = useState(false);
  return (
    <tr key={[`${shop}-item`, index].join("_")} style={{backgroundColor:isHoveringRow ?'rgba(0, 0, 0, 0.1)':'white' ,borderBottom:'2px solid #e5e5e5', transition:'ease-in' , transitionDuration:'200ms' }}
      onMouseEnter={()=>{setIsHoveringRow(true)}}
      onMouseLeave={()=>{setIsHoveringRow(false)}}
    >
      <td>{index}</td>
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
        <div style={{display:'flex' , flexDirection:'column', alignItems:'center' , width:'80px' , paddingRight:'20px' , gap:'5px'}}>
          <ButtonModal order={promotion} shop={shop} />
          <DeleteModal order={promotion} shop={shop}/>
        </div>
      </td>
    </tr>
  );
}

export default Row;
