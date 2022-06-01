import React, { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Load } from "../components/Load";

export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [role, setRole] = useState("user");
  const [filter, setFilter] = useState(getFilter(searchParams));
  const [loading, setLoading] = useState(false);
  const FetchAdmins = async () => {
    setLoading(true);
    setSearchParams(filter);
    await fetch(genApi(filter), init())
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          setData(json.data);
          setRole(json.role);
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
  const PatchAdmins = async (id, item) => {
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
  const PostAdmins = async (item) => {
    setLoading(true);
    await fetch(genApiPost(), initPost(item))
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
    FetchAdmins();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    FetchAdmins();
  };
  const handleChangeFilter = (e) => {
    setFilter((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <AdminContext.Provider
      value={{
        data: data,
        role: role,
        filter: filter,
        setFilter: setFilter,
        handleChangeFilter: handleChangeFilter,
        handleSearch: handleSearch,
        PatchAdmins: PatchAdmins,
        PostAdmins: PostAdmins,
      }}
    >
      {loading && <Load />}
      {children}
    </AdminContext.Provider>
  );
};

function getFilter(searchParams) {
  let username = searchParams.get("username");
  let offset = searchParams.get("offset");
  let item = searchParams.get("item");
  username = username === undefined || username === null ? "" : username;
  offset = offset === undefined || offset === null ? 0 : offset;
  item = item === undefined || item === null ? 50 : item;
  return {
    username: username,
    offset: offset,
    item: item,
  };
}

function genApi(filter) {
  return `/api/overview/admins?username=${filter.username}&item=${filter.item}&offset=${filter.offset}`;
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
  return `/api/overview/admins/${id}`;
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
function genApiPost() {
  return `/api/overview/admins`;
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
