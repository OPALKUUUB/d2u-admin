import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Orders = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    date: "",
    username: "",
    offset: 0,
    item: 10,
  });
  const FetchOrders = async (filter) => {
    await fetch(
      `/api/yahoo/orders?date=${filter.date}&username=${filter.username}&item=${filter.item}&offset=${filter.offset}`,
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
    FetchOrders(filter);
  }, [filter]);
  return (
    <div className="container-fluid mt-3">
      <OrderFilter filter={filter} setFilter={setFilter} />
      <OrderTable data={data} filter={filter} setFilter={setFilter} />
    </div>
  );
};

const OrderFilter = ({ filter, setFilter, count }) => {
  const [username, setUsername] = useState(filter.username);
  const [date, setDate] = useState(filter.date);
  const [item, setItem] = useState(filter.item);
  const handleSearch = (e) => {
    e.preventDefault();
    setFilter((prev) => {
      return { ...prev, date: date, username: username, item: item };
    });
  };
  return (
    <div className="card mb-3">
      <h5 className="card-header">Yahoo/Orders</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSearch(e)}>
          <div className="row">
            <div className="col-12 col-md-5 mb-2">
              <input
                type="date"
                name="date"
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-5 mb-2">
              <input
                type="text"
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
  "Order",
  "Username",
  "Link",
  "Maxbid",
  "Addbid1",
  "Addbid2",
  "User Noted",
  "Admin Noted",
  "Manage",
];

const OrderTable = ({ data }) => {
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
                <RowTable item={item} index={index} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const RowTable = ({ index, item }) => {
  const [manageModalShow, setManageModalShow] = React.useState(false);
  const [winModalShow, setWinModalShow] = React.useState(false);
  return (
    <>
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{item.created_at}</td>
        <TdImg imgsrc={item.imgsrc} />
        <td>{item.username}</td>
        <TdLink link={item.link} />
        <TdBid bid={item.maxbid} bidBy={item.maxbid_work_by} index={index} />
        <TdBid bid={item.addbid1} bidBy={item.addbid1_work_by} index={index} />
        <TdBid bid={item.addbid2} bidBy={item.addbid2_work_by} index={index} />
        <td>{item.remark}</td>
        <td>{item.noted}</td>
        <td>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id={`dropdownMenuButton-${index}`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              จัดการ
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby={`dropdownMenuButton-${index}`}
            >
              <li>
                <button
                  type="button"
                  className="dropdown-item"
                  // for check value
                  // onClick={() => console.log(index, item.id)}
                  variant="primary"
                  onClick={() => setManageModalShow(true)}
                >
                  แก้ไข
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => setWinModalShow(true)}
                >
                  ชนะ
                </button>
              </li>
              <li>
                <button type="button" className="dropdown-item">
                  แพ้
                </button>
              </li>
            </ul>
          </div>
        </td>
      </tr>
      <ManageModal
        show={manageModalShow}
        onHide={() => setManageModalShow(false)}
        index={index}
      />
      <WinModal
        show={winModalShow}
        onHide={() => setWinModalShow(false)}
        index={index}
      />
    </>
  );
};

const TdLink = ({ link }) => {
  return (
    <td>
      <a href={link} target="_blank" rel="noopener noreferrer">
        link
      </a>
    </td>
  );
};

const TdBid = ({ bid, bidBy, index }) => {
  if (bid === "" || bid === null || bid === undefined) {
    return <td>-</td>;
  }
  return (
    <td>
      <p className="mb-0 text-center">{bid} (¥)</p>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={`TdBid-${index}`}
        />
        <label className="form-check-label" htmlFor={`TdBid-${index}`}>
          {bidBy}
        </label>
      </div>
    </td>
  );
};

const TdImg = ({ imgsrc }) => {
  return (
    <td>
      <img src={imgsrc} width={70} alt={imgsrc} />
    </td>
  );
};

function ManageModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen="lg-down"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          แก้ไข ({props.index + 1})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function WinModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen="lg-down"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ชนะ ({props.index + 1})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
