import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Invoice } from "./component/Invoice/Invoice";
import { Fril } from "./component/Table/Fril";
import { Mercari } from "./component/Table/Mercari";
import { Shimizu } from "./component/Table/Shimizu";
import { SumTable } from "./component/Table/SumTable";
import { Web123 } from "./component/Table/Web123";
import { Yahoo } from "./component/Table/Yahoo";
import { UserContent } from "./component/UserContent/UserContent";

export const ShipBillingItem = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("username"));
  return (
    <div>
      <button
        style={{
          width: "100px",
          margin: "20px",
          marginBottom: "0",
        }}
        onClick={() =>
          navigate(
            "/ship/billing/q-mode?username=" +
              searchParams.get("username") +
              "&round_boat=" +
              searchParams.get("round_boat")
          )
        }
      >
        Q mode
      </button>
      <UserContent />
      <div className="card mx-3">
        <div className="card-body">
          <Mercari />
          <Fril />
          <Shimizu />
          <Web123 />
          <Yahoo />
          <SumTable />
          <Invoice />
        </div>
      </div>
    </div>
  );
};
