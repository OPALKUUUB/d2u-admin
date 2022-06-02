import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
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
          Manage {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body scrollable="true">
        <div className="row">
          <div className="col-sm-12 col-md-6 mb-3">
            <img src={item[props.name]} alt={item[props.name]} width={300} />
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
