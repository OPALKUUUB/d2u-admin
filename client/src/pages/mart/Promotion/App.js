import React, { useContext } from "react";
import { PromotionContext } from "./PromotionProvider";
import Layout from "../Ewelcia/component/Layout";
import Filter from "../Ewelcia/component/Filter/Filter";
import { Table } from "../Ewelcia/component/Table/Table";

export const App = () => {
  const { promotions, setShow } = useContext(PromotionContext);
  return (
    <Layout>
      <Filter setShow={setShow} />
      <Table promotions={promotions} />
    </Layout>
  );
};
