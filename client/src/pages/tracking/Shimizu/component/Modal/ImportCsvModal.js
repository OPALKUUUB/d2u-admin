import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Load } from "../../../../../components/Load";

export const ImportCsvModal = (props) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleUpload = async () => {
    setLoading(true);
    if (file !== null) {
      let formData = new FormData();
      formData.append("file", file);
      await fetch("/api/tracking/shimizu/upload-csv", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status) {
            alert(json.message);
          } else {
            alert(json.message);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      alert("select file first!");
    }
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
          Import Csv Shimizu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body scrollable="true">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {loading && <Load />}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={handleUpload}>
          Upload
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
