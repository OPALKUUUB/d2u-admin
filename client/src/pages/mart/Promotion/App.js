import React, { useContext } from "react";
import { PromotionContext } from "./PromotionProvider";
import Layout from "./component/Layout";
import { Table } from "./component/Table/Table";
import Filter from "./component/Filter/Filter";

export const App = () => {
  const { promotions, setShow } = useContext(PromotionContext);
  return (
    <Layout>
      <Filter setShow={setShow} />
      <Table promotions={promotions} />
    </Layout>
  );
};
