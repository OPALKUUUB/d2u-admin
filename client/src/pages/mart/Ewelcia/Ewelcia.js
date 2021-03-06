import React, { useContext } from "react";
import { EwelciaContext, EwelciaProvider } from "./EwelciaProvider";
import { Table } from "../../../components/MartComponent/MartTable/Table";
import Filter from "../../../components/MartComponent/MartFilter/Filter";
import Layout from "../../../components/MartComponent/Layout";

export const App = () => {
  const { ewelciaData , setShow } = useContext(EwelciaContext);
  return (
    <Layout>
      <Filter setShow={setShow} shop="ewelcia" />
      <Table promotions={ewelciaData} shop="ewelcia" />
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