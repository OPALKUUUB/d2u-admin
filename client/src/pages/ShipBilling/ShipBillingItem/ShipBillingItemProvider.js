import React, { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const ShipBillingItemContext = createContext();
export const ShipBillingItemProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [trackings, setTrackings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [shipBilling, setShipBilling] = useState({
    cost_voyage1: 0,
    cost_voyage2: 0,
  });
  const [baseRate, setBaseRate] = useState({ rate: 0, min: false });
  const [discount, setDiscount] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const FetchBilling = async () => {
    const username = searchParams.get("username");
    const round_boat = searchParams.get("round_boat");
    const res = await fetch(
      "/shipbilling?username=" + username + "&round_boat=" + round_boat
    ).then((res) => res.json());
    return res;
  };

  useEffect(() => {
    async function getInitial() {
      const res = await FetchBilling();
      let point_new = parseFloat(res.userInfo.point_new);
      let point_old = parseFloat(
        res.userInfo.point_old === null ? 0 : res.userInfo.point_old
      );
      let base_rate = CalBaseRate(
        point_new > point_old ? point_new : point_old
      );
      setBaseRate(base_rate);
      setTrackings(res.trackings);
      setOrders(res.orders);
      setUserInfo(res.userInfo);
      setShipBilling(res.ship_billing);
    }
    getInitial();
  }, [trigger]);

  const handleUpdateCostVoyage = (obj) => {
    fetch("/update/cost/voyage", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .finally(() => setTrigger((prev) => !prev));
  };
  return (
    <ShipBillingItemContext.Provider
      value={{
        userInfo: userInfo,
        orders: orders,
        trackings: trackings,
        baseRate: baseRate,
        setBaseRate: setBaseRate,
        discount: discount,
        setDiscount: setDiscount,
        setTrigger: setTrigger,
        shipBilling: shipBilling,
        setShipBilling: setShipBilling,
        handleUpdateCostVoyage: handleUpdateCostVoyage,
      }}
    >
      {children}
    </ShipBillingItemContext.Provider>
  );
};

function CalBaseRate(point) {
  if (point > 1500) {
    return { rate: 150, min: false };
  } else if (point > 1000 && point <= 1500) {
    return { rate: 160, min: false };
  } else if (point > 500 && point <= 1000) {
    return { rate: 180, min: false };
  } else if (point > 100 && point <= 500) {
    return { rate: 200, min: false };
  }
  return { rate: 200, min: true };
}
