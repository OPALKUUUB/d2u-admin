import React, { createContext, useEffect, useState } from "react";
import { init } from "../../../other";

export const DashboardContext = createContext();
export const DashboardProvider = ({ children }) => {
  const [config, setConfig] = useState({});
  const FetchConfig = async () => {
    let data = await fetch("/api/config", init())
      .then((res) => res.json())
      .then((data) => data.data);
    return data;
  };
  const PatchConfig = async (obj) => {
    let data = await fetch("/api/config", init("PATCH", obj))
      .then((res) => res.json())
      .then((data) => data);
    return data;
  };
  useEffect(() => {
    async function fetchData() {
      let data = await FetchConfig();
      setConfig(data);
    }
    fetchData();
  }, []);
  return (
    <DashboardContext.Provider
      value={{ config: config, PatchConfig: PatchConfig }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
