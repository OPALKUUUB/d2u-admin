import React, { useContext } from "react";
// import { Atm } from "./component/Atm/Atm";
import { Layout } from "./component/Layout";
import { Yen } from "./component/Yen/Yen";
import { DashboardContext } from "./context/DashboardProvider";

function App() {
  const { config, PatchConfig } = useContext(DashboardContext);
  console.log(config);

  return (
    <Layout>
      <Yen rate={config.yen} patch={PatchConfig} />
      {/* <Atm name={config.atm_name} no={config.atm_no} qr={config.atm_qr} /> */}
    </Layout>
  );
}

export default App;
