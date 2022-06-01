import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Load } from "../../../../components/Load";
import { ShowDateTime } from "../../../../components/ShowDateTime";
import { isEmpty } from "../../All/AllItem/Test";
import { trackingModel } from "../component/Table/trackingModel";

export const Edit = () => {
  const [loading, setLoading] = useState(false);
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
          <Form data={data} setData={setData} setLoading={setLoading} />
        </div>
      </div>
      {loading && <Load />}
    </div>
  );
};
const Form = ({ data, setData, setLoading }) => {
  const [pic1File, setPic1File] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let t = data;
    if (pic1File !== "" && pic1File !== null) {
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
    await fetch(genApi(data.id), init(t))
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          alert(json.message);
        } else {
          alert(json.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        navigate(-1);
      });
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
      <div className="row">
        {formData.map((item) => {
          return (
            <div className={item.col + " mb-3"} key={item.id}>
              <label className="form-label">{item.label}</label>
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
        {data.pic1_filename !== "" ? (
          <>
            <div className="col mb-3">
              <img
                src={data.pic1_filename}
                alt={data.pic1_filename}
                width={200}
              />
            </div>
            <div className="col-7 mb-3">
              <FormImage
                name="pic1"
                picFile={pic1File}
                setPicFile={setPic1File}
              />
            </div>
          </>
        ) : (
          <div className="col-12 mb-3">
            <FormImage
              name="pic1"
              picFile={pic1File}
              setPicFile={setPic1File}
            />
          </div>
        )}
      </div>
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
    label: "BoxId",
    col: "col-4",
  },
  { id: 4, name: "url", label: "URL", col: "col-4" },
  {
    id: 6,
    name: "track_id",
    label: "TrackId",
    col: "col-4",
  },
  {
    id: 7,
    name: "weight",
    label: "Weight(kg.)",
    type: "number",
    col: "col-4",
  },
  { id: 8, name: "q", label: "Q", type: "number", col: "col-4" },
  { id: 9, name: "round_boat", label: "Voyage", type: "date", col: "col-4" },
  { id: 12, name: "remark", label: "remark", col: "col-12" },
];

function genApi(id) {
  return `/api/tracking/shimizu?id=${id}`;
}

function init(body) {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("token")).token
      }`,
    },
    body: JSON.stringify(body),
  };
}

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
