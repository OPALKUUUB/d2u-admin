import React, { useContext } from "react";
import { AdminContext } from "../../../../../context/AdminProvider";
import { Tr } from "./Tr";

const Tbody = () => {
  const { data } = useContext(AdminContext);
  return (
    <tbody>
      {data.map((item, index) => (
        <Tr key={index} item={item} index={index} />
      ))}
    </tbody>
  );
};

export default Tbody;
