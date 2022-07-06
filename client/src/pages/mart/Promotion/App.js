import React, { useContext } from "react";
import { PromotionContext } from "./PromotionProvider";
import Layout from "./component/Layout";
// import Filter from "./component/Filter/Filter";
import { Table } from "./component/Table/Table";
import { ButtonModal } from "./component/Modal/AddPromotionModal";

export const App = () => {
  const { test } = useContext(PromotionContext);
  console.log(test);
  return (
    <Layout>
      {/* <Filter /> */}
      <ButtonModal />
      <Table />
    </Layout>
  );
};
