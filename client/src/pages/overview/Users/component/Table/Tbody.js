import React, { useContext } from "react";
import { UserContext } from "../../../../../context/UserProvider";
import { Tr } from "./Tr";

const Tbody = () => {
  const { data } = useContext(UserContext);
  return (
    <tbody>
      {data.map((item, index) => (
        <Tr key={index} item={item} index={index} />
      ))}
    </tbody>
  );
};

export default Tbody;
