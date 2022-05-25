import React, { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Load } from "../components/Load";

export const HistoryContext = createContext();
export const HistoryProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(getFilter(searchParams));

  const FetchHistory = async () => {
    setLoading(true);
    setSearchParams(filter);
    await fetch(genApi(filter), init())
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          setData(json.data);
        } else {
          alert(json.message);
          if (json.error === "jwt") {
            localStorage.removeItem("token");
          }
          window.location.reload(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    FetchHistory();
    //eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    FetchHistory();
  };

  return (
    <HistoryContext.Provider
      value={{
        data: data,
        filter: filter,
        setFilter: setFilter,
        handleSearch: handleSearch,
        search: FetchHistory,
        setLoading: setLoading,
      }}
    >
      {loading && <Load />}
      {children}
    </HistoryContext.Provider>
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
