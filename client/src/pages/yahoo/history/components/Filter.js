import React, { useContext } from "react";
import { HistoryContext } from "../../context/HistoryProvider";

export const Filter = () => {
  const { filter, setFilter, handleSearch } = useContext(HistoryContext);
  return (
    <div className="card mb-3">
      <h5 className="card-header">Yahoo / Historys</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSearch(e)}>
          <div className="row">
            <div className="col-12 col-md-4 mb-2">
              <input
                type="date"
                name="date"
                className="form-control"
                value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-4 mb-2">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter Username"
                value={filter.username}
                onChange={(e) =>
                  setFilter({ ...filter, username: e.target.value })
                }
              />
            </div>
            <div className="col-12 col-md-1 mb-2">
              <select
                className="form-select"
                aria-label="item"
                name="item"
                value={filter.item}
                onChange={(e) => setFilter({ ...filter, item: e.target.value })}
              >
                <option value={10} defaultValue>
                  10
                </option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="col-12 col-md-1 mb-2">
              <select
                className="form-select"
                aria-label="status"
                name="status"
                value={filter.status}
                onChange={(e) =>
                  setFilter({ ...filter, status: e.target.value })
                }
              >
                <option value="" defaultValue>
                  status
                </option>
                <option value="win">win</option>
                <option value="lose">lose</option>
              </select>
            </div>
            <div className="col-12 col-md-1">
              <button type="submit" className="btn btn-primary w-100">
                search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
