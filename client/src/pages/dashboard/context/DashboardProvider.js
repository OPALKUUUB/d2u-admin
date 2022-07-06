import React, { createContext, useEffect, useState } from "react";
import { init } from "../../../other";

export const DashboardContext = createContext();
export const DashboardProvider = ({ children }) => {
  const [config, setConfig] = useState(Config);
  const [trigger, setTrigger] = useState(false);
  const FetchConfig = async () => {
    let data = await fetch("/api/config", init())
      .then((res) => res.json())
      .then((data) => data.data);
    return data;
  };
  const PatchConfig = async (obj) => {
    let data = await fetch("/api/config", init("PATCH", obj))
      .then((res) => res.json())
      .then((data) => data)
      .finally(() => {
        setTrigger(!trigger);
      });
    return data;
  };
  useEffect(() => {
    async function fetchData() {
      let data = await FetchConfig();
      setConfig(data);
    }
    fetchData();
  }, [trigger]);
  return (
    <DashboardContext.Provider
      value={{ config: config, PatchConfig: PatchConfig }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

const Config = {
  atm_name: "",
  atm_no: "",
  atm_qr: "",
  yen: 0,
};
