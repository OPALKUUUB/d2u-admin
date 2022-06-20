import React from "react";
import Tbody from "./Tbody";
import Thead from "./Thead";

export const Table = () => {
  return (
    <div style={{ maxHeight: "52vh", overflow: "scroll" }}>
      <table className="table table-striped table-hover">
        <Thead />
        <Tbody />
      </table>
    </div>
  );
};
