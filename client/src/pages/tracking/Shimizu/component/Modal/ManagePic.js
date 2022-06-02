import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export const ManagePic = (props) => {
  const [item, setItem] = useState(props.item);
  const [picFile, setPicFile] = useState(null);
  const handleSave = () => {
    console.log(picFile);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen="lg-down"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Manage Pic1
        </Modal.Title>
      </Modal.Header>
      <Modal.Body scrollable="true">
        <div className="row">
          <div className="col-sm-12 col-md-6 mb-3">
            <img
              src={item.pic1_filename}
              alt={item.pic1_filename}
              width={300}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <FormImage
              name={props.name}
              picFile={picFile}
              setPicFile={setPicFile}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
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
    </Modal>
  );
};

const FormImage = ({ name, picFile, setPicFile }) => {
  const [image, setImage] = useState(null);
  const handleSelectPicFile = (e) => {
    setPicFile(e.target.files[0]);
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setImage(objectUrl);
  };

  const handlePaste = (e) => {
    if (e.clipboardData.files.length) {
      setPicFile(e.clipboardData.files[0]);
      const objectUrl = URL.createObjectURL(e.clipboardData.files[0]);
      setImage(objectUrl);
    }
  };
  return (
    <>
      <input
        className="form-control"
        type="file"
        name="pic_filename"
        onChange={handleSelectPicFile}
      />
      <div
        style={{
          cursor: "pointer",
        }}
      >
        {image === null ? (
          <div
            style={{
              background: "gray",
              width: "100%",
              height: "150px",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPaste={handlePaste}
          >
            paste image hear
          </div>
        ) : (
          <img src={image} alt={image} width="100%" />
        )}
      </div>
    </>
  );
};
