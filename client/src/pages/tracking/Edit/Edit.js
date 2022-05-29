import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShowDateTime } from "../../../components/ShowDateTime";
import { isEmpty } from "../All/AllItem/Test";
import { trackingModel } from "../Shimizu/component/Table/trackingModel";

export const Edit = () => {
  const [data, setData] = useState(trackingModel);
  const params = useParams();
  useEffect(() => {
    fetch(`/api/tracking/all/${params.id}`, {
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
          setData(json.data);
          // console.table(json.data);
        } else {
          alert(json.message);
        }
      });
  }, [params.id]);
  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header">
          Username: {data.username} / channel: {data.channel} / Date:{" "}
          <ShowDateTime option="d" date={data.created_at} />
        </div>
        <div className="card-body">
          <Form data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};
const Form = ({ data, setData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };
  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      {formData.map((item) => {
        return (
          <div className="form-group mb-3" key={item.id}>
            <label className="form-label">{item.tag}</label>
            <input
              className="form-control"
              type={item.type}
              name={item.name}
              value={isEmpty(data[item.name]) ? "" : data[item.name]}
              onChange={handleChange}
            />
          </div>
        );
      })}
      <div className="col">
        <button type="submit" className="btn btn-success w-100">
          save
        </button>
      </div>
    </form>
  );
};

const formData = [
  {
    id: 3,
    name: "box_id",
    tag: "BoxId",
  },
  { id: 4, name: "url", tag: "URL" },
  { id: 5, name: "price", tag: "price" },
  {
    id: 6,
    name: "track_id",
    tag: "TrackId",
  },
  {
    id: 7,
    name: "weight",
    tag: "Weight(kg.)",
    type: "number",
  },
  { id: 8, name: "q", tag: "Q", type: "number" },
  { id: 9, name: "round_boat", tag: "RoundBoat", type: "date" },
  { id: 12, name: "remark", tag: "remark" },
];
