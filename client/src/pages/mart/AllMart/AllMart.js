import React from "react";
import { Table } from "../component/Table/Table";
import { AllMartProvider } from "../context/AllMartProvider";
import { Card, Layout } from "../styles/MartStyles";

export const AllMart = () => {
  return (
    <AllMartProvider>
      <Layout>
        <Card>
          <h1>Section Filter</h1>
        </Card>
        <Card>
          <Table />
        </Card>
      </Layout>
    </AllMartProvider>
  );
};
