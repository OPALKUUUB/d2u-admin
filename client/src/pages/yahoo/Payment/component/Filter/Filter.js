import React, { useContext } from "react";
import { FormFilter } from "../../../../../components/FormFilter/FormFilter";
import { PaymentContext } from "../../../../../context/PaymentProvider";
import Form_Data from "./formData";

export const Filter = () => {
  const { filter, handleChangeFilter, handleSearch } =
    useContext(PaymentContext);
  return (
    <FormFilter
      Form_Data={Form_Data}
      filter={filter}
      handleChangeFilter={handleChangeFilter}
      handleSearch={handleSearch}
    />
  );
};
