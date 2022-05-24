import React, { createContext, useEffect, useState } from "react";
import { Load } from "../components/Load";

export const HistoryContext = createContext();
export const HistoryProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    date: "",
    username: "",
    offset: 0,
    item: 10,
    status: "",
  });

  const FetchHistory = async () => {
    setLoading(true);
    await fetch(
      `/api/yahoo/historys?date=${filter.date}&username=${filter.username}&item=${filter.item}&offset=${filter.offset}&status=${filter.status}`,
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
