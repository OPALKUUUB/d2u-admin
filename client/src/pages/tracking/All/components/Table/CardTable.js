import React from "react";

export const CardTable = ({ children }) => {
  return (
    <div className="card">
      <div className="card-body">{children}</div>
    </div>
  );
};
