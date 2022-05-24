import React, { createContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const ShowItemContext = createContext();
export const ShowItemProvider = ({ children }) => {
  let params = useParams();
  //eslint-disable-next-line
  let [searchParams, setSearchParams] = useSearchParams();
  let [data, setData] = useState({});
  useEffect(() => {
    fetch(
      `/api/yahoo/historys/${params.id}?status=${searchParams.get("status")}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          setData(json.data);
        } else {
          alert(json.message);
          if (json.error === "jwt") {
            localStorage.remove("token");
          }
          window.location.reload(false);
        }
      });
    //eslint-disable-next-line
  }, []);
  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <ShowItemContext.Provider
      value={{
        data: data,
        handleChange: handleChange,
      }}
    >
      {children}
    </ShowItemContext.Provider>
  );
};
