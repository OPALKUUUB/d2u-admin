import React, { useContext } from "react";
import { AdminContext } from "../../../../../context/AdminProvider";
import Form_Data from "./formData";
import { FormFilter } from "../../../../../components/FormFilter/FormFilter";

export const Filter = () => {
  const { filter, handleChangeFilter, handleSearch } = useContext(AdminContext);
  return (
    <FormFilter
      Form_Data={Form_Data}
      filter={filter}
      handleChangeFilter={handleChangeFilter}
      handleSearch={handleSearch}
    />
  );
};
