import React, { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Load } from "../components/Load";

export const PaymentContext = createContext();
export const PaymentProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(getFilter(searchParams));

  const FetchPayment = async () => {
    setLoading(true);
    setSearchParams(filter);
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
    FetchPayment();
    //eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    FetchPayment();
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
  const handleChangeFilter = (e) => {
    setFilter((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
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
        andleChangeFilter: handleChangeFilter,
        handlePrevious: handlePrevious,
        handleNext: handleNext,
      }}
    >
      {loading && <Load />}
      {children}
    </PaymentContext.Provider>
  );
};
function getFilter(searchParams) {
  let date = searchParams.get("date");
  let username = searchParams.get("username");
  let offset = searchParams.get("offset");
  let item = searchParams.get("item");
  date = date === undefined || date === null ? "" : date;
  username = username === undefined || username === null ? "" : username;
  offset = offset === undefined || offset === null ? 0 : offset;
  item = item === undefined || item === null ? 10 : item;
  return {
    date: date,
    username: username,
    offset: offset,
    item: item,
  };
}
