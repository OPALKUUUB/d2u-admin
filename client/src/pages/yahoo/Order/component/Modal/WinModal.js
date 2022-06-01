import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ShowDateTime } from "../../../../../components/ShowDateTime";
import { OrderContext } from "../../../../../context/OrderProvider";
import Win_Data from "./Win_Data";

export const WinModal = (props) => {
  const [item, setItem] = useState(props.item);
  const { PatchOrder } = useContext(OrderContext);
  const handleChange = (e) => {
    setItem((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let win = false;
    if (
      item.payment_status === "pending1" ||
      item.payment_status === "pending2"
    ) {
      win = true;
    }
    PatchOrder(item.id, item, win);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen="lg-down"
    >
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Bidding Win
          </Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable="true">
          <div className="card mb-3">
            <div className="card-header">ข้อมูล</div>
            <div className="card-body">
              <p className="card-text">
                วันที่: <ShowDateTime date={item.created_at} option="d" />
                <br />
                Username: {item.username}
                <br />
                Link:{" "}
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.link}
                </a>
                <br />
                Maxbid: {item.maxbid} ¥ ({item.maxbid_work_by}) | Addbid1:{" "}
                {item.addbid1} ¥ ({item.addbid1_work_by}) | Addbid2:{" "}
                {item.addbid2} ¥ ({item.addbid2_work_by})<br />
                User Noted: {item.remark}
              </p>
            </div>
          </div>
          <div className="row">
            {Win_Data.map((form) => {
              if (form.type === "text") {
                return (
                  <div key={form.id} className={form.col}>
                    <div className="form-group" key={form.id}>
                      <label className="form-label">{form.label}</label>
                      <input
                        className="form-control"
                        type="text"
                        name={form.name}
                        value={
                          item[form.name] === undefined ||
                          item[form.name] === null
                            ? ""
                            : item[form.name]
                        }
                        onChange={handleChange}
                        placeholder={form.placeholder}
                      />
                    </div>
                  </div>
                );
              } else if (form.type === "select") {
                return (
                  <div key={form.id} className={form.col}>
                    <div className="form-group">
                      <label className="form-label">{form.label}</label>
                      <select
                        className="form-select"
                        name={form.name}
                        defaultValue={
                          item[form.name] === undefined ||
                          item[form.name] === null
                            ? ""
                            : item[form.name]
                        }
                        onChange={handleChange}
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
                  <div key={form.id} className={form.col}>
                    <div className="form-group" key={form.id}>
                      <label className="form-label">{form.label}</label>
                      <input
                        className="form-control"
                        type="number"
                        name={form.name}
                        value={
                          item[form.name] === undefined ||
                          item[form.name] === null
                            ? 0
                            : item[form.name]
                        }
                        onChange={handleChange}
                        placeholder={form.placeholder}
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={props.onHide}
          >
            Close
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
