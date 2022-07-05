import React, { useContext, useEffect } from "react";
import { Atm } from "./component/Atm";
import { Yen } from "./component/Yen";
import { DashboardContext } from "./context/DashboardProvider";

function App() {
  const { config, PatchConfig } = useContext(DashboardContext);
  console.log(config);

  return (
    <div>
      <Yen rate={config.yen} />
      <Atm name={config.atm_name} no={config.atm_no} qr={config.atm_qr} />
    </div>
  );
}

export default App;
