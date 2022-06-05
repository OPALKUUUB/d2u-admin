import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import FormImage from "../../../../../components/FormImage/FormImage";
import { AllTrackingContext } from "../../../../../context/AllTrackingProvider";

export const ManagePic = (props) => {
  const [item, setItem] = useState(props.item);
  const [picFile, setPicFile] = useState(null);
  const { PatchShimizuTracking } = useContext(AllTrackingContext);
  const handleSave = async () => {
    let t = item;
    if (picFile !== "" && picFile !== null) {
      const d = new FormData();
      d.append("file", picFile);
      d.append("upload_preset", "d2u-service");
      d.append("cloud_name", "d2u-service");
      await fetch("https://api.cloudinary.com/v1_1/d2u-service/upload", {
        method: "POST",
        body: d,
      })
        .then((resp) => resp.json())
        .then((data) => {
          t[props.name] = data.url;
        })
        .catch((err) => console.log(err));
    }
    await PatchShimizuTracking(t.id, t);
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
