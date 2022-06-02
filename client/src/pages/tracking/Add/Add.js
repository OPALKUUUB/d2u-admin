import React, { useEffect, useState } from "react";
import { Load } from "../../../components/Load";
import addTrackingModel from "./AddModel";
import { AutoComplete } from "./component/AutoComplete/AutoComplete";

export const Add = () => {
  const [tracking, setTracking] = useState(addTrackingModel);
  const [pic1File, setPic1File] = useState(null);
  const [pic2File, setPic2File] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(`/api/overview/users/autocomplete`, {
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
          setUser(json.data);
        } else {
          alert(json.message);
        }
      });
  }, []);
  const handleChange = (e) => {
    setTracking((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTracking({ ...tracking, username: "test", channel: "mercari" });
    if (tracking.username === "" || tracking.username === undefined) {
      alert("กรุณาเลือก username!");
    } else if (tracking.channel === undefined || tracking.channel === "") {
      alert("กรุณาเลือก channel!");
    } else {
      setLoading(true);
      let t = tracking;
      if (pic1File !== null) {
        console.log("in pic1");
        const data = new FormData();
        data.append("file", pic1File);
        data.append("upload_preset", "d2u-service");
        data.append("cloud_name", "d2u-service");
        let urlname = await fetch(
          "https://api.cloudinary.com/v1_1/d2u-service/upload",
          {
            method: "POST",
            body: data,
          }
        )
          .then((resp) => resp.json())
          .then((data) => data.url)
          .catch((err) => console.log(err));
        t.pic1_filename = urlname;
      }
      if (pic2File !== null) {
        console.log("in pic12");
        const data = new FormData();
        data.append("file", pic2File);
        data.append("upload_preset", "d2u-service");
        data.append("cloud_name", "d2u-service");
        let urlname = await fetch(
          "https://api.cloudinary.com/v1_1/d2u-service/upload",
          {
            method: "POST",
            body: data,
          }
        )
          .then((resp) => resp.json())
          .then((data) => data.url)
          .catch((err) => console.log(err));
        t.pic2_filename = urlname;
      }
      fetch("/api/tracking/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
        body: JSON.stringify(t),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status) {
            setTracking(addTrackingModel);
            alert(json.message);
          } else {
            alert(json.message);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };
  return (
    <div className="container mt-3">
      {loading && <Load />}
      <div className="card">
        <div className="card-header">Add Tracking</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-3">
                <label htmlFor="channel" className="form-label">
                  channel
                </label>
                <select
                  className="form-select"
                  name="channel"
                  onChange={handleChange}
                  value={tracking.channel}
                >
                  <option value={""}>select</option>
                  <option value={"shimizu"}>shimizu</option>
                  <option value={"mercari"}>mercari</option>
                  <option value={"fril"}>fril</option>
                  <option value={"123"}>web123</option>
                </select>
              </div>
              <div className="col-3 mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  onChange={handleChange}
                  value={tracking.date}
                />
              </div>
              <div className="col-3 mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <AutoComplete
                  datas={user}
                  state={tracking.username}
                  setState={(username) =>
                    setTracking({ ...tracking, username: username })
                  }
                  filter="username"
                >
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    onChange={handleChange}
                    value={tracking.username}
                  />
                </AutoComplete>
              </div>

              <div className="col-3 mb-3">
                <label htmlFor="boxId" className="form-label">
                  BoxId
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="box_id"
                  placeholder="Enter BoxId"
                  onChange={handleChange}
                />
              </div>

              <div className="col-2 mb-3">
                <label htmlFor="trackId" className="form-label">
                  TrackId
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="track_id"
                  placeholder="Enter TrackId"
                  onChange={handleChange}
                />
              </div>
              <div className="col-2 mb-3">
                <label htmlFor="weight" className="form-label">
                  Weight
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="weight"
                  placeholder="Enter TrackId"
                  onChange={handleChange}
                />
              </div>
              <div className="col-2 mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 mb-3">
                <label htmlFor="roundBoat" className="form-label">
                  RoundBoat
                </label>
                <input
                  className="form-control"
                  type="date"
                  name="round_boat"
                  placeholder="Enter RoundBoat"
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 mb-3">
                <label htmlFor="url" className="form-label">
                  URL
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="url"
                  placeholder="Enter Url"
                  onChange={handleChange}
                />
              </div>
              <div className="col-6 mb-3">
                <FormImage
                  name="pic1"
                  picFile={pic1File}
                  setPicFile={setPic1File}
                />
              </div>
              <div className="col-6 mb-3">
                <FormImage
                  name="pic2"
                  picFile={pic2File}
                  setPicFile={setPic2File}
                />
              </div>

              <div className="col-12 mb-3">
                <label htmlFor="remark" className="form-label">
                  Remark
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="remark"
                  placeholder="Enter Remark"
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <button type="submit" className="btn btn-success w-100">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
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
      <label htmlFor={name} className="form-label">
        {name}
      </label>
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
