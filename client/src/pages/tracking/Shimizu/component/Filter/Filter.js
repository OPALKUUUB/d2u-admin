import React, { useContext } from "react";
import { AllContext } from "../../../context/AllProvider";

export const Filter = () => {
  const { filter, handleFilter, search } = useContext(AllContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12 col-md-2 mb-2">
          <label className="form-label">date</label>
          <input
            className="form-control"
            type="date"
            name="date"
            value={filter.created_at}
            onChange={handleFilter}
          />
        </div>
        <div className="col-12 col-md-2 mb-2">
          <label className="form-label">username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            value={filter.username}
            onChange={handleFilter}
          />
        </div>
        <div className="col-12 col-md-2 mb-2">
          <label className="form-label">trackId</label>
          <input
            className="form-control"
            type="text"
            name="trackId"
            value={filter.trackId}
            onChange={handleFilter}
          />
        </div>
        <div className="col-12 col-md-2 mb-2">
          <label className="form-label">item</label>
          <input
            className="form-control"
            type="number"
            name="item"
            value={filter.item}
            onChange={handleFilter}
          />
        </div>
        <div className="col-12 col-md-1 mt-4">
          <button className="btn btn-primary w-100" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};
