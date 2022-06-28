import React from "react";
import { Fril } from "./component/Table/Fril";
import { Mercari } from "./component/Table/Mercari";
import { Shimizu } from "./component/Table/Shimizu";
import { SumTable } from "./component/Table/SumTable";
import { Web123 } from "./component/Table/Web123";
import { Yahoo } from "./component/Table/Yahoo";
import { UserContent } from "./component/UserContent/UserContent";

export const ShipBillingItem = () => {
  return (
    <>
      <UserContent />
      <div className="card mx-3">
        <div className="card-body">
          <Mercari />
          <Fril />
          <Shimizu />
          <Web123 />
          <Yahoo />
          <SumTable />
        </div>
      </div>
    </>
  );
};
