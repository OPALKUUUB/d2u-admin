import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShowDateTime } from "../../../../components/ShowDateTime";
import { Card } from "../components/Table/Card";
import Test, { isEmpty } from "./Test";

export const AllItem = () => {
  const [data, setData] = useState({});
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
          console.table(json.data);
        } else {
          alert(json.message);
        }
      });
  }, [params.id]);
  return (
    <div className="container mt-3">
      <Card>
        <div className="container">
          <p>id: {value(data.id)}</p>
          <p>
            created at: <ShowDateTime option="d" date={data.created_at} />
          </p>
          <p>username: {value(data.username)}</p>
          <p>channel: {value(data.channel)}</p>
          {!isEmpty(data.url) && <p>url: {value(data.url)}</p>}
          {!isEmpty(data.price) && <p>price: {value(data.price)}</p>}
          {!isEmpty(data.q) && <p>q: {value(data.q)}</p>}
          {!isEmpty(data.pic1_filename) && (
            <p>
              img1:{" "}
              <img
                src={data.pic1_filename}
                alt={data.pic1_filename}
                width={200}
              />
            </p>
          )}
          {!isEmpty(data.pic2_filename) && (
            <p>
              img2:{" "}
              <img
                src={data.pic2_filename}
                alt={data.pic2_filename}
                width={200}
              />
            </p>
          )}
          {isEmpty(data.point) ? (
            <p>point: no calculate</p>
          ) : (
            <p>point: {data.point}}</p>
          )}
        </div>
      </Card>
    </div>
  );
};

function value(item) {
  return isEmpty(item) ? "loading..." : item;
}
