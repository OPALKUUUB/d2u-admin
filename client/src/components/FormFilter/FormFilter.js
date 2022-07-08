import React from "react";

export const FormFilter = ({
  Form_Data,
  filter,
  handleChangeFilter,
  handleSearch,
}) => {
  return (
    <form onSubmit={handleSearch}>
      <div className="row">
        {Form_Data.map((form) => {
          let key = ["filter", form.id].join("_");
          if (form.type === "select") {
            return (
              <div key={key} className={form.col}>
                <div className="form-group">
                  <label className="form-label">{form.label}</label>
                  <select
                    className="form-select"
                    name={form.name}
                    defaultValue={filter[form.name]}
                    onChange={handleChangeFilter}
                  >
                    {form.option.map((option) => (
                      <option
                        key={[key, option.id].join("-")}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          } else if (form.type === "number") {
            return (
              <div key={key} className={form.col}>
                <div className="form-group">
                  <label className="form-label">{form.label}</label>
                  <input
                    className="form-control"
                    type="number"
                    name={form.name}
                    value={filter[form.name]}
                    onChange={handleChangeFilter}
                    placeholder={form.placeholder}
                  />
                </div>
              </div>
            );
          }
          return (
            <div key={key} className={form.col}>
              <div className="form-group">
                <label className="form-label">{form.label}</label>
                <input
                  className="form-control"
                  type={form.type}
                  name={form.name}
                  value={filter[form.name]}
                  onChange={handleChangeFilter}
                  placeholder={form.placeholder}
                />
              </div>
            </div>
          );
        })}
        <div className="col-sm-12 col-md-1">
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
