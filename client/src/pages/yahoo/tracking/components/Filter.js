import React, { useContext } from "react";
import { TrackingContext } from "../../context/TrackingProvider";

export const Filter = () => {
  const { filter, setFilter, handleSearch } = useContext(TrackingContext);
  return (
    <div className="card mb-3">
      <h5 className="card-header">Yahoo / Trackings</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSearch(e)}>
          <div className="row">
            <div className="col-12 col-md-2 mb-2">
              <label className="form-labels">วันที่</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-2 mb-2">
              <label className="form-labels">Username</label>
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
            <div className="col-12 col-md-2 mb-2">
              <label className="form-labels">Track Id</label>
              <input
                type="text"
                name="track_id"
                className="form-control"
                placeholder="Enter track id"
                value={filter.track_id}
                onChange={(e) =>
                  setFilter({ ...filter, track_id: e.target.value })
                }
              />
            </div>
            <div className="col-12 col-md-2 mb-2">
              <label className="form-labels">รอบเรือ</label>
              <input
                type="date"
                name="round_boat"
                className="form-control"
                placeholder="Enter Round Boat"
                value={filter.round_boat}
                onChange={(e) =>
                  setFilter({ ...filter, round_boat: e.target.value })
                }
              />
            </div>
            <div className="col-12 col-md-1 ">
              <label className="form-labels">แสดง</label>
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
            <div className="col-12 col-md-1 mt-4">
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
