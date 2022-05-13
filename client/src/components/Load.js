import React from "react";
import { Grid } from "react-loader-spinner";

export const Load = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        background: "black",
        opacity: "0.5",
        zIndex: "9999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid color="white" height={80} width={80} />
    </div>
  );
};
