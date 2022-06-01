import React, { useEffect, useState, createContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Load } from "../components/Load";

export const OrderContext = createContext();
export const OrderProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(getFilter(searchParams));

  const FetchOrders = async () => {
    setLoading(true);
    setSearchParams(filter);
    await fetch(
      `/api/yahoo/orders?username=${filter.username}&item=${filter.item}&offset=${filter.offset}`,
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

  const PatchOrder = async (id, item, win = false) => {
    await fetch(`/api/yahoo/orders?id=${id}${win ? "&win=win" : ""}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((error) => console.log(error))
      .finally(() => {
        window.location.reload(false);
      });
  };
  const handleLose = (id) => {
    if (window.confirm("คุณแน่ใจที่จะเปลี่ยนแปลงสถานะ(lose)?")) {
      fetch("/api/yahoo/orders?id=" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
        body: JSON.stringify({
          status: "lose",
        }),
      })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((error) => console.log(error))
        .finally(() => {
          FetchOrders();
        });
    }
  };
  useEffect(() => {
    FetchOrders();
    //eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    FetchOrders();
  };
  return (
    <OrderContext.Provider
      value={{
        data: data,
        filter: filter,
        setFilter: setFilter,
        handleSearch: handleSearch,
        search: FetchOrders,
        setLoading: setLoading,
        handleLose: handleLose,
        PatchOrder: PatchOrder,
      }}
    >
      {loading && <Load />}
      {children}
    </OrderContext.Provider>
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
