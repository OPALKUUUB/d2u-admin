import React from "react";

export const CardFilter = ({ children, mode = "All" }) => {
  return (
    <div className="card mb-3">
      <h5 className="card-header">Tracking / {mode}</h5>
      <div className="card-body">{children}</div>
    </div>
  );
};
