import React, { useContext } from "react";
import { AllTrackingContext } from "../../../../../context/AllTrackingProvider";
import { Tr } from "./Tr";

const Tbody = () => {
  const { data } = useContext(AllTrackingContext);
  return (
    <tbody>
      {data.map((item, index) => {
        return <Tr key={index} item={item} index={index} />;
      })}
    </tbody>
  );
};

export default Tbody;
