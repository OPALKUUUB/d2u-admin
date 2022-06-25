import React from "react";
import { BottomTable } from "./component/BottomTable/BottomTable";
import { TopTable } from "./component/TopTable/TopTable";
import { UserContent } from "./component/UserContent/UserContent";

export const ShipBillingItem = () => {
  return (
    <>
      <UserContent />
      <div className="card mx-3">
        <div className="card-body">
          <TopTable />
          <BottomTable />
        </div>
      </div>
    </>
  );
};
