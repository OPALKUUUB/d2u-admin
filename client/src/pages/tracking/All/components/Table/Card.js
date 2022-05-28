import React from "react";

export const Card = ({ children }) => {
  return (
    <div className="card">
      <div className="card-body">{children}</div>
    </div>
  );
};
