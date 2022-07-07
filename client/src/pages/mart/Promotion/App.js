import React, { useContext } from "react";
import { PromotionContext } from "./PromotionProvider";
import Layout from "./component/Layout";
import Filter from "./component/Filter/Filter";
import { Table } from "./component/Table/Table";

export const App = () => {
  const { promotions, setShow } = useContext(PromotionContext);
  return (
    <Layout>
      <Filter setShow={setShow} />
      <Table promotions={promotions} />
    </Layout>
  );
};
