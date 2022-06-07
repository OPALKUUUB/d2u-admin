import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import FormImage from "../../../../../components/FormImage/FormImage";

export const ManageSlip = (props) => {
  const [picFile, setPicFile] = useState(null);
  const [data, setData] = useState({
    id: "",
    price: "",
    slip_image_filename: "",
  });
  useEffect(() => {
    const FetchSlip = async () => {
      await fetch("/api/yahoo/slip/" + props.id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status) {
            // alert(json.message);
            setData(json.data);
          } else {
            alert(json.message);
          }
        });
    };
    FetchSlip();
  }, [props.id]);
  const PatchSlip = async (obj) => {
    await fetch("/api/yahoo/slip/" + obj.id, {
      method: "PATCH",
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
        } else {
          alert(json.message);
        }
      });
  };
  const handleUpdateSlip = async () => {
    let temp = data;
    if (picFile !== null) {
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
          temp.slip_image_filename = data.url;
        })
        .catch((err) => console.log(err));
    }
    await PatchSlip(temp);
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
            <img
              src={data.slip_image_filename}
              alt={data.slip_image_filename}
              width={300}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={data.price}
                />
              </div>
              <div className="col-12">
                <FormImage
                  name="slip_image_filename"
                  picFile={picFile}
                  setPicFile={setPicFile}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdateSlip}
        >
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
