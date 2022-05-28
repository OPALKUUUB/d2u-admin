import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function isEmpty(value) {
  return value === "" || value === null || value === undefined;
}

const Test = () => {
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
        } else {
          alert(json.message);
        }
      });
  }, [params.id]);
  return (
    <div>
      {Object.keys(data).map((keys, index) => (
        <div className="d-flex flex-column" key={index}>
          {keys}: {isEmpty(data[keys]) ? "no data" : data[keys]}
        </div>
      ))}
    </div>
  );
};

export default Test;
