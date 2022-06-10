import React from "react";
import { Table } from "../component/Table/Table";
import { AllMartProvider } from "../context/AllMartProvider";
import { Card, Layout } from "../styles/MartStyles";
import { useNavigate } from "react-router-dom";

export const AllMart = () => {
  let navigate = useNavigate();
  return (
    <AllMartProvider>
      <Layout>
        <div className="d-flex justify-content-end my-3">
          <button
            className="btn btn-success"
            onClick={() => navigate("/mart/add")}
          >
            + Add Mart
          </button>
        </div>
        <Card>
          <Table />
        </Card>
      </Layout>
    </AllMartProvider>
  );
};
