import React, { useEffect, useState, createContext } from "react";
import { Load } from "../../../components/Load";

export const OrderContext = createContext();
export const OrderProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    date: "",
    username: "",
    offset: 0,
    item: 10,
  });

  const FetchOrders = async () => {
    setLoading(true);
    await fetch(
      `/api/yahoo/orders?date=${filter.date}&username=${filter.username}&item=${filter.item}&offset=${filter.offset}`,
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
      }}
    >
      {loading && <Load />}
      {children}
    </OrderContext.Provider>
  );
};
