import React, { useContext } from "react";
import { OrderContext } from "../../../../../context/OrderProvider";
import { Tr } from "./Tr";

const Tbody = () => {
  const { data } = useContext(OrderContext);
  return (
    <tbody>
      {data.map((item, index) => (
        <Tr key={index} item={item} index={index} />
      ))}
    </tbody>
  );
};

export default Tbody;
