import React, { useContext, useEffect, useState } from "react";
import { AllTrackingContext } from "../../../../../context/AllTrackingProvider";
import styled from "styled-components";
import FormImage from "../../../../../components/FormImage/FormImage";

let tracking_model = {
  date: new Date().toISOString().split("T")[0],
  channel: "",
  username: "",
  url: "",
  box_id: "",
  weight: 0,
  price: 0,
  track_id: "",
  round_boat: "",
  pic1_filename: "",
  pic2_filename: "",
  remark: "",
};
export const FormAdd = () => {
  const { PostTracking } = useContext(AllTrackingContext);
  const [post, setPost] = useState(tracking_model);
  const [pic1File, setPic1File] = useState(null);
  const [pic2File, setPic2File] = useState(null);
  const handleChange = (e) => {
    setPost((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (post.channel === "") {
      return alert("please enter channel");
    } else if (post.username === "") {
      return alert("please enter username");
    }
    let t = post;
    if (pic1File !== null) {
      const d = new FormData();
      d.append("file", pic1File);
      d.append("upload_preset", "d2u-service");
      d.append("cloud_name", "d2u-service");
      await fetch("https://api.cloudinary.com/v1_1/d2u-service/upload", {
        method: "POST",
        body: d,
      })
        .then((resp) => resp.json())
        .then((data) => {
          t.pic1_filename = data.url;
        })
        .catch((err) => console.log(err));
    }
    if (pic2File !== null) {
      const d = new FormData();
      d.append("file", pic2File);
      d.append("upload_preset", "d2u-service");
      d.append("cloud_name", "d2u-service");
      await fetch("https://api.cloudinary.com/v1_1/d2u-service/upload", {
        method: "POST",
        body: d,
      })
        .then((resp) => resp.json())
        .then((data) => {
          t.pic2_filename = data.url;
        })
        .catch((err) => console.log(err));
    }
    await PostTracking(t);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-3 mb-3">
          <label className="form-label">Date</label>
          <input
            className="form-control"
            name="date"
            type="date"
            value={post.date}
            onChange={handleChange}
          />
        </div>
        <div className="col-3 mb-3">
          <label className="form-label">Username</label>
          <AutoComplete
            state={post.username}
            setState={(value) => setPost({ ...post, username: value })}
          >
            <input
              className="form-control"
              name="username"
              type="text"
              value={post.username}
              onChange={handleChange}
            />
          </AutoComplete>
        </div>
        <div className="col-3 mb-3">
          <label className="form-label">Channel</label>
          <select
            className="form-select"
            name="channel"
            value={post.channel}
            onChange={handleChange}
          >
            <option>select</option>
            <option value="shimizu">shimizu</option>
            <option value="mercari">mercari</option>
            <option value="fril">fril</option>
            <option value="123">web123</option>
          </select>
        </div>
        <div className="col-3 mb-3">
          <label className="form-label">Url</label>
          <input
            className="form-control"
            name="url"
            type="text"
            value={post.url}
            onChange={handleChange}
          />
        </div>
        <div className="col-3 mb-3">
          <label className="form-label">Box No.</label>
          <input
            className="form-control"
            name="box_id"
            type="text"
            value={post.box_id}
            onChange={handleChange}
          />
        </div>
        <div className="col-3 mb-3">
          <label className="form-label">Weight (kg.)</label>
          <input
            className="form-control"
            name="weight"
            type="number"
            value={post.weight}
            onChange={handleChange}
          />
        </div>
        <div className="col-3 mb-3">
          <label className="form-label">Price</label>
          <input
            className="form-control"
            name="price"
            type="number"
            value={post.price}
            onChange={handleChange}
          />
        </div>
        <div className="col-3 mb-3">
          <label className="form-label">Voyage</label>
          <input
            className="form-control"
            name="round_boat"
            type="date"
            value={post.round_boat}
            onChange={handleChange}
          />
        </div>
        <div className="col-6 mb-3">
          <FormImage
            name="pic1_filename"
            picFile={pic1File}
            setPicFile={setPic1File}
          />
        </div>
        <div className="col-6 mb-3">
          <FormImage
            name="pic2_filename"
            picFile={pic2File}
            setPicFile={setPic2File}
          />
        </div>
        <div className="col-12 mb-3">
          <label className="form-label">Note</label>
          <input
            className="form-control"
            name="remark"
            type="text"
            value={post.remark}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

const AutoCompleteBox = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 100px;
  overflow-y: scroll;
`;

const AutoCompleteItem = styled.li`
  cursor: pointer;
  padding: 10px 20px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
function AutoComplete({ children, state, setState }) {
  const [users, setUsers] = useState([{}]);
  const [lastState, setLastState] = useState("");

  useEffect(() => {
    fetch("/api/overview/users/autocomplete", init())
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          setUsers(json.data);
        } else {
          alert(json.message);
        }
      });
  }, []);
  return (
    <div>
      {children}
      <div
        style={{
          position: "relative",
        }}
      >
        <AutoCompleteBox>
          {state !== lastState &&
            users
              .filter((user) =>
                user.username.toLowerCase().includes(state.toLowerCase())
              )
              .map((item) => (
                <AutoCompleteItem
                  style={{ padding: "10px 20px" }}
                  key={item.id}
                  onClick={() => {
                    setLastState(item.username);
                    setState(item.username);
                  }}
                >
                  {item.username}
                </AutoCompleteItem>
              ))}
        </AutoCompleteBox>
      </div>
    </div>
  );
}

function init() {
  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("token")).token
      }`,
    },
  };
}
