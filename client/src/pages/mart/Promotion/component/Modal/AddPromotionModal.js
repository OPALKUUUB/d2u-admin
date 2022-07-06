import React, { useState } from "react";
import "./styles.css";
import * as IoIcons from "react-icons/io";

const AddPromotionModal = ({ show, onHide }) => {
  if (show) {
    return (
      <>
        <div className="backdrop" onClick={onHide} />
        <div className="Modal">
          <div className="Modal-header">
            <h2>
              <IoIcons.IoIosAdd />
              Add Promotion
            </h2>
          </div>
          <div className="Modal-body">
            <div>
              <label>Name</label>
              <input type="text" name="name" />
            </div>
            <div>
              <label>Price</label>
              <input type="number" name="price" />
            </div>
            <div>
              <label>Description</label>
              <textarea name="description"></textarea>
            </div>
            <div>
              <label>image</label>
              <input type="file" name="image" />
            </div>
          </div>
          <div className="Modal-footer">
            <button>
              <IoIcons.IoIosAdd />
              Add
            </button>
          </div>
        </div>
      </>
    );
  }
};

export const ButtonModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>
        <IoIcons.IoIosAdd />
        <span>Promotion</span>
      </button>
      <AddPromotionModal show={show} onHide={() => setShow(false)} />
    </>
  );
};

export default AddPromotionModal;
