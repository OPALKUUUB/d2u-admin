import React, { useContext } from "react";
import { AdminContext } from "../../../../../context/AdminProvider";
import { Tr } from "./Tr";
import { v4 as uuidv4 } from "uuid";

const Tbody = () => {
  const { data } = useContext(AdminContext);
  // console.log(data);
  return (
    <tbody>
      {data.map((item, index) => (
        <Tr key={uuidv4()} item={item} index={index} />
      ))}
    </tbody>
  );
};

export default Tbody;
