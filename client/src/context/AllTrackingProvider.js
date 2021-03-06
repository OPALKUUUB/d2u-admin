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
          console.log(json.data);
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
    console.log(item);
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

  const PatchTracking = async (id, item) => {
    setLoading(true);
    await fetch(genApiPatch(id), initPatch(item))
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
  const PostTracking = async (item) => {
    setLoading(true);
    await fetch(genApiPost(), initPost(item))
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          alert(json.message);
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
    if (window.confirm("??????????????????????????????????????????????")) {
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
    async function getInitial() {
      await FetchTracking();
    }
    getInitial();
  }, []);
  const handleClickSort = (sort) => {
    setSearchParams({ ...filter, sort: sort });
    window.location.reload(false);
  };
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
        PostTracking: PostTracking,
        DeleteTracking: DeleteTracking,
        PatchTracking: PatchTracking,
        handleClickSort: handleClickSort,
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
  let trackId = searchParams.get("track_id");
  let roundBoat = searchParams.get("round_boat");
  let offset = searchParams.get("offset");
  let item = searchParams.get("item");
  let channel =
    window.location.pathname.split("/")[2] === "web123"
      ? "123"
      : window.location.pathname.split("/")[2];
  // console.log(window.location.pathname.split("/")[2]);
  let check1 = searchParams.get("check1");
  let check2 = searchParams.get("check2");
  let sort = searchParams.get("sort");
  date = date === undefined || date === null ? "" : date;
  username = username === undefined || username === null ? "" : username;
  trackId = trackId === undefined || trackId === null ? "" : trackId;
  roundBoat = roundBoat === undefined || roundBoat === null ? "" : roundBoat;
  check1 = check1 === undefined || check1 === null ? "all" : check1;
  check2 = check2 === undefined || check2 === null ? "all" : check2;
  offset = offset === undefined || offset === null ? 0 : offset;
  item = item === undefined || item === null ? 50 : item;
  channel = channel === undefined || channel === null ? "" : channel;
  sort = sort === undefined || sort === null ? 1 : sort;
  return {
    date: date,
    username: username,
    track_id: trackId,
    round_boat: roundBoat,
    offset: offset,
    item: item,
    check1: check1,
    check2: check2,
    channel: channel,
    sort: sort,
  };
}

function genApi(filter) {
  return `/api/tracking?check1=${filter.check1}&check2=${filter.check2}&date=${filter.date}&username=${filter.username}&trackId=${filter.track_id}&roundBoat=${filter.round_boat}&offset=${filter.offset}&item=${filter.item}&channel=${filter.channel}&sort=${filter.sort}`;
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
function genApiPatch(id) {
  return `/api/tracking/mer123fril?id=${id}`;
}
function genApiPost(id) {
  return `/api/tracking`;
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
function initPost(item) {
  return {
    method: "POST",
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
