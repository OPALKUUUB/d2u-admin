import React from "react";
import { useParams } from "react-router-dom";

const EditMart = () => {
  const { id } = useParams();
  return <div>EditMart {id}</div>;
};

export default EditMart;
