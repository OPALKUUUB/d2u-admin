import React from "react";
import Modal from "react-bootstrap/Modal";

export const ShowImage = (props) => {
  return (
    <Modal {...props}>
      <Modal.Body>
        <img src={props.src} alt={props.src} />
      </Modal.Body>
    </Modal>
  );
};
