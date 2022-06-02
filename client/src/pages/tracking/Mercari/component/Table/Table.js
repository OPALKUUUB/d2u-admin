import React from "react";
import Tbody from "./Tbody";
import Thead from "./Thead";

export const Table = () => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <Thead />
        <Tbody />
      </table>
    </div>
  );
};
