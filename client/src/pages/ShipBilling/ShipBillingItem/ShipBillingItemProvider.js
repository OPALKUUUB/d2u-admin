import React, { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const ShipBillingItemContext = createContext();
export const ShipBillingItemProvider = ({ children }) => {
  const [searchParams] = useSearchParams();

  const [rateYen, setRateYen] = useState(0);
  const [shimizuOrders, setShimizuOrders] = useState([]);
  const [web123Orders, setWeb123Orders] = useState([]);
  const [yahooOrders, setYahooOrders] = useState([]);
  const [mercariOrders, setMercariOrders] = useState([]);
  const [frilOrders, setFrilOrders] = useState([]);

  const [sumWeb123, setSumWeb123] = useState({
    cod: 0,
    weight: 0,
    price: 0,
  });
  const [sumShimizu, setSumShimizu] = useState({
    cod: 0,
    weight: 0,
    price: 0,
  });
  const [sumYahoo, setSumYahoo] = useState({
    cod: 0,
    weight: 0,
    price: 0,
  });
  const [sumMercari, setSumMercari] = useState({
    cod: 0,
    weight: 0,
    price: 0,
  });
  const [sumFril, setSumFril] = useState({
    cod: 0,
    weight: 0,
    price: 0,
  });

  const [userInfo, setUserInfo] = useState({});
  const [shipBilling, setShipBilling] = useState({
    cost_voyage1: 0,
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

      let shimizu = res.trackings.filter(
        (filtered) => filtered.channel === "shimizu"
      );
      let web123 = res.trackings.filter(
        (filtered) => filtered.channel === "123"
      );
      let mercari = res.trackings.filter(
        (filtered) => filtered.channel === "mercari"
      );
      let fril = res.trackings.filter(
        (filtered) => filtered.channel === "fril"
      );
      let yahoo = res.orders;
      // console.log(res.trackings);
      setShimizuOrders(shimizu);
      setWeb123Orders(web123);
      setYahooOrders(yahoo);
      setMercariOrders(mercari);
      setFrilOrders(fril);

      setRateYen(parseFloat(res.config.yen));
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
        rateYen: rateYen,
        userInfo: userInfo,
        baseRate: baseRate,
        setBaseRate: setBaseRate,
        discount: discount,
        setDiscount: setDiscount,
        setTrigger: setTrigger,
        shipBilling: shipBilling,
        setShipBilling: setShipBilling,
        handleUpdateCostVoyage: handleUpdateCostVoyage,

        shimizuOrders: shimizuOrders,
        setShimizuOrders: setShimizuOrders,
        web123Orders: web123Orders,
        setWeb123Orders: setWeb123Orders,
        yahooOrders: yahooOrders,
        setYahooOrders: setYahooOrders,
        mercariOrders: mercariOrders,
        setMercariOrders: setMercariOrders,
        frilOrders: frilOrders,
        setFrilOrders: setFrilOrders,

        sumWeb123: sumWeb123,
        setSumWeb123: setSumWeb123,
        sumShimizu: sumShimizu,
        setSumShimizu: setSumShimizu,
        sumYahoo: sumYahoo,
        setSumYahoo: setSumYahoo,
        sumMercari: sumMercari,
        setSumMercari: setSumMercari,
        sumFril: sumFril,
        setSumFril: setSumFril,
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
