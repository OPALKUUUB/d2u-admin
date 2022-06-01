import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShowDateTime } from "../../../../../components/ShowDateTime";
export const TableRow = ({ index, item }) => {
  // const [data, setData] = useState(item);
  const data = item;
  const navigate = useNavigate();
  // const handleChange = (e) => {
  //   setData((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };
  return (
    <>
      <tr>
        <td>{index}</td>
        <td>
          <ShowDateTime date={data.created_at} option="d" />
        </td>
        <td>{data.username}</td>
        <td>{data.track_id}</td>
        <td>{data.box_id}</td>
        <td>
          <ShowDateTime date={data.round_boat} option="d" />
        </td>
        <td>
          <img src={data.pic1_filename} alt={data.pic1_filename} width={100} />
        </td>
        <td>
          <img src={data.pic2_filename} alt={data.pic2_filename} width={100} />
        </td>
        <td>{data.noted}</td>
        <td>{data.point}</td>
        <td>
          <button
            type="button"
            className="btn-sm btn-success me-3"
            onClick={() => navigate(`/tracking/mer123fril/edit/${data.id}`)}
          >
            edit
          </button>
          <button
            type="button"
            className="btn-sm btn-success"
            onClick={() => navigate(`/tracking/all/${data.id}`)}
          >
            view
          </button>
        </td>
      </tr>
    </>
  );
};
