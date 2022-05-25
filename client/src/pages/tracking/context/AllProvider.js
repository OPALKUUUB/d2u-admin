import React, { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Load } from "../../../components/Load";

export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(getFilter(searchParams));

  const FetchTracking = async () => {
    setLoading(true);
    setSearchParams(filter);
    //   await fetch()
  };
  useEffect(() => {
    FetchTracking();
    //eslint-disable-next-line
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    FetchTracking();
  };
  return (
    <AllContext.Provider value={"test"}>
      {loading && <Load />}
      {children}
    </AllContext.Provider>
  );
};

function getFilter(searchParams) {
  let date = searchParams.get("date");
  let username = searchParams.get("username");
  let offset = searchParams.get("offset");
  let item = searchParams.get("item");
  let status = searchParams.get("status");
  date = date === undefined || date === null ? "" : date;
  username = username === undefined || username === null ? "" : username;
  offset = offset === undefined || offset === null ? 0 : offset;
  item = item === undefined || item === null ? 10 : item;
  status = status === undefined || status === null ? "" : status;
  return {
    date: date,
    username: username,
    offset: offset,
    item: item,
    status: status,
  };
}

function genApi(filter) {
  return `/api/yahoo/historys?date=${filter.date}&username=${filter.username}&item=${filter.item}&offset=${filter.offset}&status=${filter.status}`;
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
