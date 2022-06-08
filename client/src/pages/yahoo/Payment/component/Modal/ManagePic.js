import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export const ManagePic = (props) => {
  const item = props.item;
  const [picFile, setPicFile] = useState(null);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const handleSave = async () => {
    let obj = {
      order_id: item.id,
      price: price,
      slip: "",
    };
    if (picFile !== null && image !== "") {
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
          obj.slip = data.url;
        })
        .catch((err) => console.log(err));
    }
    await fetch("/api/yahoo/slip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          alert(json.message);
          window.location.reload(false);
        } else {
          alert(json.message);
        }
      });
  };
  const onClose = () => {
    setImage("");
    setPicFile(null);
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
          <div className="col-sm-12 col-md-6">
            <div className="form-group mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <FormImage
              name={props.name}
              picFile={picFile}
              setPicFile={setPicFile}
              setImage={setImage}
            />
          </div>
          {image !== "" && (
            <div className="col-sm-12 col-md-6">
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    fontSize: "2rem",
                    cursor: "pointer",
                  }}
                  onClick={onClose}
                >
                  x
                </span>
                <img src={image} alt={image} width={300} />
              </div>
            </div>
          )}
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

const FormImage = ({ name, picFile, setPicFile, setImage }) => {
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
          paste image here
        </div>
      </div>
    </>
  );
};

export default FormImage;
