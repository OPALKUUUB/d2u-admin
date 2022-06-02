import React, { useContext } from "react";
import { PaymentContext } from "../../../../../context/PaymentProvider";
import { Tr } from "./Tr";

const Tbody = () => {
  const { data } = useContext(PaymentContext);
  return (
    <tbody>
      {data.map((item, index) => (
        <Tr key={index} item={item} index={index} />
      ))}
    </tbody>
  );
};

export default Tbody;
