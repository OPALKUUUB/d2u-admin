import React, { useState, useEffect } from "react";

export const Users = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [filter, setFilter] = useState({
    username: "",
    offset: 0,
    item: 10,
  });

  const countUsers = async () => {
    await fetch("/api/overview/users/count")
      .then((res) => res.json())
      .then((json) => setCount(json.count));
  };

  useEffect(() => {
    countUsers();
  }, []);

  const FetchUsers = async (filter) => {
    await fetch(
      `/api/overview/users?username=${filter.username}&item=${filter.item}&offset=${filter.offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          setData(json.data);
        } else {
          alert(json.message);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    FetchUsers(filter);
  }, [filter]);

  return (
    <div className="container-fluid mt-3">
      <UserFilter filter={filter} setFilter={setFilter} count={count} />
      <p>Total {count} rows</p>
      <UserTable data={data} filter={filter} setFilter={setFilter} />
    </div>
  );
};

const UserFilter = ({ filter, setFilter, count }) => {
  const [username, setUsername] = useState(filter.username);
  const [item, setItem] = useState(filter.item);
  const handleSearch = (e) => {
    e.preventDefault();
    setFilter((prev) => {
      return { ...prev, username: username, item: item };
    });
  };
  return (
    <div className="card mb-3">
      <h5 className="card-header">Users</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSearch(e)}>
          <div className="row">
            <div className="col-12 col-md-10 mb-2">
              <input
                name="username"
                className="form-control"
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-1 mb-2">
              <select
                className="form-select"
                aria-label="item"
                name="item"
                onChange={(e) => setItem(e.target.value)}
              >
                <option value={10} defaultValue>
                  10
                </option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={count}>all</option>
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

const THEAD = [
  "#",
  "Date",
  "Username",
  "Name",
  "Phone",
  "Address",
  "Contact",
  "Point",
  "Manage",
];

const UserTable = ({ data }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {THEAD.map((head, index) => {
                  return (
                    <th scope="col" key={index}>
                      {head}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.created_at}</td>
                  <td>{item.username}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.contact}</td>
                  <td>{item.point_new}</td>
                  <td>
                    <button className="btn btn-success">manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
