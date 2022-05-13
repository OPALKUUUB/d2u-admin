import React, { createContext, useEffect, useState } from "react";
import { Load } from "../../../components/Load";

export const PaymentContext = createContext();
export const PaymentProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    date: "",
    username: "",
    offset: 0,
    item: 10,
  });

  const FetchPayment = async () => {
    setLoading(true);
    await fetch(
      `/api/yahoo/payments?date=${filter.date}&username=${filter.username}&item=${filter.item}&offset=${filter.offset}`,
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
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    FetchPayment();
    //eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    FetchPayment();
  };

  return (
    <PaymentContext.Provider
      value={{
        data: data,
        filter: filter,
        setFilter: setFilter,
        handleSearch: handleSearch,
        search: FetchPayment,
        setLoading: setLoading,
      }}
    >
      {loading && <Load />}
      {children}
    </PaymentContext.Provider>
  );
};
