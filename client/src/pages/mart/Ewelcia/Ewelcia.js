import React, { useContext } from "react";
import { EwelciaContext, EwelciaProvider } from "./EwelciaProvider";
import Layout from "./component/Layout";
import Filter from "./component/Filter/Filter";
import { Table } from "./component/Table/Table";

export const App = () => {
  const { ewelciaData , setShow } = useContext(EwelciaContext);
  return (
    <Layout>
      <Filter setShow={setShow} />
      <Table promotions={ewelciaData} />
    </Layout>
  );
};

function Ewelcia() {
  return (
    <EwelciaProvider>
        <App/>
    </EwelciaProvider>
  )
}

export default Ewelcia