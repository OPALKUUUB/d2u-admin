import React from "react";
import { Table } from "./component/Table/Table";
import { DaisoProvider } from "../context/DaisoProvider";
import { Card, Layout } from "../styles/MartStyles";
import { useNavigate } from "react-router-dom";

export const Daiso = () => {
  let navigate = useNavigate();
  return (
    <DaisoProvider>
      <Layout>
        <Card>
          <Table />
        </Card>
      </Layout>
    </DaisoProvider>
  );
};
