import React from "react";
import { useParams } from "react-router-dom";
import { MartProvider } from "../context/MartProvider";
import { Card, Layout } from "../styles/MartStyles";
import { Table } from "./component/Table/Table";

const Mart = () => {
  const { id } = useParams();
  return (
    <MartProvider>
      <Layout>
        <Card>
          <h1>Filter Id {id}</h1>
        </Card>
        <Card className="mt-3">
          <Table />
        </Card>
      </Layout>
    </MartProvider>
  );
};

export default Mart;
