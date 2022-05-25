import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 95%;
  margin: 30px auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`;
export const ShowHistoryItem = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(ORDER_MODEL);
  useEffect(() => {
    fetch(
      `/api/yahoo/historys/${params.id}?status=${searchParams.get("status")}`,
      init()
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          console.table(json.data);
          setData(json.data);
        } else {
          console.log(json);
        }
      });
  }, []);
  return (
    <Container>
      <Form data={data} />
    </Container>
  );
};

const Form = ({ data }) => {
  return (
    <form>
      <div className="form-group row mb-2">
        <div className="col-sm-2">Username:</div>
        <div className="col-sm-10">{data.username}</div>
      </div>
      <div className="form-group row mb-2">
        <label htmlFor="link" className="col-sm-2 col-form-label">
          link:
        </label>
        <div className="col-sm-10">
          <a href={data.link} target="_blank" rel="noopener noreferrer">
            {data.link}
          </a>{" "}
          ({data.bid_by})
        </div>
      </div>
      <div>
        <p>
          price: {data.price} บาท, bid: {data.bid} yen, weight: {data.weight}{" "}
          kg., point: {data.bid}/2000 + {data.weight} ={" "}
          {Math.round((data.bid / 2000 + parseFloat(data.weight)) * 100) / 100}{" "}
          คะแนน
        </p>
      </div>
      <div className="form-group row mb-2">
        <label htmlFor="imgsrc" className="col-sm-2 col-form-label">
          img:
        </label>
        <div className="col-sm-5">
          <img src={data.imgsrc} alt={data.imgsrc} width="100%" />
        </div>
        <div className="col-sm-5">
          <img src={data.slip} alt={data.slip} width="100%" />
        </div>
      </div>
    </form>
  );
};

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

let ORDER_MODEL = {
  id: "",
  payment_id: "",
  username: "",
  link: "",
  imgsrc: "",
  maxbid: "",
  addbid1: "",
  addbid2: "",
  remark: "",
  status: "",
  created_at: "",
  updated_at: "",
  bid: "",
  tranfer_fee_injapan: "",
  delivery_in_thai: "",
  payment_status: "",
  maxbid_work_by: "",
  addbid1_work_by: "",
  addbid2_work_by: "",
  bid_by: "",
  track_id: "",
  box_id: "",
  weight: "",
  round_boat: "",
  inform_bill: "",
  noted: "",
  point: "",
  addPoint: "",
  done: "",
};
