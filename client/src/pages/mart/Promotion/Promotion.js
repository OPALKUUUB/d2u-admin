import React, { useContext } from "react";
import { PromotionProvider } from "./PromotionProvider";
import { PromotionContext } from "./PromotionProvider";
import Layout from "../../../components/MartComponent/Layout";
import Filter from "../../../components/MartComponent/MartFilter/Filter";
import { Table } from "../../../components/MartComponent/MartTable/Table";

export const App = () => {
  const { promotions, setShow } = useContext(PromotionContext);
  return (
    <Layout>
      <Filter setShow={setShow} shop="promotion" />
      <Table promotions={promotions} shop="promotion" />
    </Layout>
  );
};

const Promotion = () => {
  return (
    <PromotionProvider>
      <App />
    </PromotionProvider>
  );
};

export default Promotion;
