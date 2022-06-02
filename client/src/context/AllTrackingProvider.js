import React, { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Load } from "../components/Load";

export const AllTrackingContext = createContext();
export const AllTrackingProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(getFilter(searchParams));
  const [loading, setLoading] = useState(false);

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
          if (json.error === "jwt") {
            localStorage.removeItem("token");
          }
          window.location.reload(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const PatchShimizuTracking = async (id, item) => {
    setLoading(true);
    await fetch(genApiPatchShimizu(id), initPatch(item))
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
      .finally(() => {
        setLoading(false);
        window.location.reload(false);
      });
  };
  const DeleteTracking = async (id) => {
    if (window.confirm("คุณแน่ใจที่จะลบ?")) {
      setLoading(true);
      await fetch(genApiDelete(id), initDelete())
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
        .finally(() => {
          setLoading(false);
          window.location.reload(false);
        });
    }
  };
  useEffect(() => {
    FetchTracking();
  }, []);
  const handleChangeFilter = (e) => {
    setFilter((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    FetchTracking();
  };
  const handlePrevious = () => {
    setSearchParams({
      ...filter,
      offset: parseInt(filter.offset) - parseInt(filter.item),
    });
    window.location.reload(false);
  };
  const handleNext = () => {
    setSearchParams({
      ...filter,
      offset: parseInt(filter.offset) + parseInt(filter.item),
    });
    window.location.reload(false);
  };
  return (
    <AllTrackingContext.Provider
      value={{
        data: data,
        filter: filter,
        handleChangeFilter: handleChangeFilter,
        handleSearch: handleSearch,
        handleNext: handleNext,
        handlePrevious: handlePrevious,
        PatchShimizuTracking: PatchShimizuTracking,
        DeleteTracking: DeleteTracking,
      }}
    >
      {loading && <Load />}
      {children}
    </AllTrackingContext.Provider>
  );
};

function getFilter(searchParams) {
  let date = searchParams.get("date");
  let username = searchParams.get("username");
  let trackId = searchParams.get("trackId");
  let roundBoat = searchParams.get("roundBoat");
  let offset = searchParams.get("offset");
  let item = searchParams.get("item");
  let channel = searchParams.get("channel");
  date = date === undefined || date === null ? "" : date;
  username = username === undefined || username === null ? "" : username;
  trackId = trackId === undefined || trackId === null ? "" : trackId;
  roundBoat = roundBoat === undefined || roundBoat === null ? "" : roundBoat;
  offset = offset === undefined || offset === null ? 0 : offset;
  item = item === undefined || item === null ? 10 : item;
  channel = channel === undefined || channel === null ? "" : channel;
  return {
    date: date,
    username: username,
    trackId: trackId,
    roundBoat: roundBoat,
    offset: offset,
    item: item,
    channel: channel,
  };
}

function genApi(filter) {
  return `/api/tracking?
  date=${filter.date}
  &username=${filter.username}
  &trackId=${filter.trackId}
  &roundBoat=${filter.roundBoat}
  &offset=${filter.offset}
  &item=${filter.item}
  &channel=${filter.channel}
  `;
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

function genApiPatchShimizu(id) {
  return `/api/tracking/shimizu?id=${id}`;
}

function initPatch(item) {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("token")).token
      }`,
    },
    body: JSON.stringify(item),
  };
}

function genApiDelete(id) {
  return `/api/tracking/${id}`;
}

function initDelete() {
  return {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("token")).token
      }`,
    },
  };
}