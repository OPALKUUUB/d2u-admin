import React, { createContext, useEffect, useState } from "react";
import { Load } from "../../../components/Load";

export const TrackingContext = createContext();
export const TrackingProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    date: "",
    username: "",
    track_id: "",
    round_boat: "",
    offset: 0,
    item: 10,
    status: "",
  });

  const FetchTracking = async () => {
    setLoading(true);
    await fetch(
      `/api/yahoo/trackings?date=${filter.date}&username=${filter.username}&track_id=${filter.track_id}&round_boat=${filter.round_boat}&item=${filter.item}&offset=${filter.offset}&status=${filter.status}`,
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
    FetchTracking();
    //eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    FetchTracking();
  };

  return (
    <TrackingContext.Provider
      value={{
        data: data,
        filter: filter,
        setFilter: setFilter,
        handleSearch: handleSearch,
        search: FetchTracking,
        setLoading: setLoading,
      }}
    >
      {loading && <Load />}
      {children}
    </TrackingContext.Provider>
  );
};
