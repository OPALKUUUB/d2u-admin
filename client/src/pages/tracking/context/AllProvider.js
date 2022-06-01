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
    await fetch(genApi(filter), init())
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          setData(json.data);
        } else {
          alert(json.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    FetchTracking();
    //eslint-disable-next-line
  }, []);
  const handleSearch = () => {
    FetchTracking();
  };
  const handleFilter = (e) => {
    setFilter((prev) => {
      return { ...filter, [e.target.name]: e.target.value };
    });
  };
  return (
    <AllContext.Provider
      value={{
        data: data,
        search: handleSearch,
        filter: filter,
        setFilter: setFilter,
        handleFilter: handleFilter,
      }}
    >
      {loading && <Load />}
      {children}
    </AllContext.Provider>
  );
};

function getFilter(searchParams) {
  let date = searchParams.get("date");
  let username = searchParams.get("username");
  let trackId = searchParams.get("trackId");
  let offset = searchParams.get("offset");
  let item = searchParams.get("item");
  let status = searchParams.get("status");
  let channel = searchParams.get("channel");
  let roundBoat = searchParams.get("roundBoat");
  date = date === undefined || date === null ? "" : date;
  username = username === undefined || username === null ? "" : username;
  trackId = trackId === undefined || trackId === null ? "" : trackId;
  offset = offset === undefined || offset === null ? 0 : offset;
  item = item === undefined || item === null ? 10 : item;
  status = status === undefined || status === null ? "" : status;
  channel = channel === undefined || channel === null ? "" : channel;
  roundBoat = roundBoat === undefined || roundBoat === null ? "" : roundBoat;
  return {
    date: date,
    username: username,
    trackId: trackId,
    offset: offset,
    item: item,
    status: status,
    channel: channel,
    roundBoat: roundBoat,
  };
}

function genApi(filter) {
  return `/api/tracking/all?date=${filter.date}&username=${filter.username}&item=${filter.item}&offset=${filter.offset}&trackId=${filter.trackId}&channel=${filter.channel}&roundBoat=${filter.roundBoat}`;
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
