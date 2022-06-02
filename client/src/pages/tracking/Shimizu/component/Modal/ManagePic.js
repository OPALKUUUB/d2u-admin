import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export const ManagePic = (props) => {
  const [item, setItem] = useState(props.item);

  const handleChange = (e) => {
    setItem((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     PatchShimizuTracking(item.id, item);
  //   };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen="lg-down"
    >
      <form
      //   onSubmit={handleSubmit}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Manage Pic1
          </Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable="true">
          <div className="container">
            <div>
              <img
                src={item.pic1_filename}
                alt={item.pic1_filename}
                width={400}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={props.onHide}
          >
            Close
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
