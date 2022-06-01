import React, { useContext } from "react";
import { AdminContext } from "../../../../../context/AdminProvider";
import Form_Data from "./formData";

export const Filter = () => {
  const { filter, handleChangeFilter, handleSearch } = useContext(AdminContext);
  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <div className="row">
        {Form_Data.map((form) => {
          if (form.type === "text") {
            return (
              <div key={form.id} className="col-2">
                <div className="form-group" key={form.id}>
                  <label className="form-label">{form.label}</label>
                  <input
                    className="form-control"
                    type="text"
                    name={form.name}
                    value={filter[form.name]}
                    onChange={(e) => handleChangeFilter(e)}
                    placeholder={form.placeholder}
                  />
                </div>
              </div>
            );
          } else if (form.type === "select") {
            return (
              <div key={form.id} className="col-2">
                <div className="form-group">
                  <label className="form-label">{form.label}</label>
                  <select
                    className="form-select"
                    name={form.name}
                    defaultValue={filter[form.name]}
                    onChange={(e) => handleChangeFilter(e)}
                  >
                    {form.option.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          } else if (form.type === "number") {
            return (
              <div key={form.id} className="col-2">
                <div className="form-group" key={form.id}>
                  <label className="form-label">{form.label}</label>
                  <input
                    className="form-control"
                    type="number"
                    name={form.name}
                    value={filter[form.name]}
                    onChange={(e) => handleChangeFilter(e)}
                    placeholder={form.placeholder}
                  />
                </div>
              </div>
            );
          }
        })}
        <div className="col-2">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "31px" }}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};
