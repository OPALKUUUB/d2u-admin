import React, { useContext } from "react";
import { Omni7Context, Omni7Provider } from "./Omni7Provider";
import { Table } from "../../../components/MartComponent/MartTable/Table";
import Filter from "../../../components/MartComponent/MartFilter/Filter";
import Layout from "../../../components/MartComponent/Layout";


export const App = () => {
  const { omni7Data , setShow } = useContext(Omni7Context);
  return (
    <Layout>
      <Filter setShow={setShow} shop="omni7" />
      <Table promotions={omni7Data} shop="omni7" />
    </Layout>
  );
};

function Omni7() {
  return (
    <Omni7Provider>
        <App/>
    </Omni7Provider>
  )
}

export default Omni7