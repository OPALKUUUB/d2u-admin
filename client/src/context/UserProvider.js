import React, { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Load } from "../components/Load";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(getFilter(searchParams));
  const [loading, setLoading] = useState(false);
  const FetchUsers = async () => {
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
  const PatchUsers = async (id, item) => {
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
  useEffect(() => {
    FetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    FetchUsers();
  };
  const handleChangeFilter = (e) => {
    setFilter((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <UserContext.Provider
      value={{
        data: data,
        filter: filter,
        setFilter: setFilter,
        handleChangeFilter: handleChangeFilter,
        handleSearch: handleSearch,
        PatchUsers: PatchUsers,
      }}
    >
      {loading && <Load />}
      {children}
    </UserContext.Provider>
  );
};

function getFilter(searchParams) {
  let date = searchParams.get("date");
  let username = searchParams.get("username");
  let sort = searchParams.get("sort");
  let offset = searchParams.get("offset");
  let item = searchParams.get("item");
  date = date === undefined || date === null ? "" : date;
  username = username === undefined || username === null ? "" : username;
  sort = sort === undefined || sort === null ? "desc" : sort;
  offset = offset === undefined || offset === null ? 0 : offset;
  item = item === undefined || item === null ? 10 : item;
  return {
    date: date,
    username: username,
    offset: offset,
    item: item,
    sort: sort,
  };
}

function genApi(filter) {
  return `/api/overview/users?username=${filter.username}&item=${filter.item}&offset=${filter.offset}&sort=${filter.sort}`;
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
function genApiPatch(id) {
  return `/api/overview/users/${id}`;
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
