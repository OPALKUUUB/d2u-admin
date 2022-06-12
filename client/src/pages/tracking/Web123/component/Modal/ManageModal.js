import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AllTrackingContext } from "../../../../../context/AllTrackingProvider";
import Manage_Data from "./Manage_Data";

export const ManageModal = (props) => {
  const [item, setItem] = useState(props.item);
  const { PatchTracking } = useContext(AllTrackingContext);

  const handleChange = (e) => {
    setItem((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    PatchTracking(item.id, item);
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
            Manage Web123
          </Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable="true">
          <div className="row">
            {Manage_Data.map((form) => {
              if (form.type === "select") {
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
              return (
                <div key={form.id} className={form.col}>
                  <div className="form-group" key={form.id}>
                    <label className="form-label">{form.label}</label>
                    <input
                      className="form-control"
                      type={form.type}
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
