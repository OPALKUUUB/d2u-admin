import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { TrackingContext } from "../../../context/TrackingProvider";
import { ShowDateTime } from "../ShowDateTime";

function checkObj(obj) {
  return obj === null || obj === undefined ? "" : obj;
}
function ManageModal(props) {
  const { search } = useContext(TrackingContext);
  let item = props.item;
  const [tracking, setTracking] = useState({
    track_id: checkObj(item.track_id),
    box_id: checkObj(item.box_id),
    weight: checkObj(item.weight),
    round_boat: checkObj(item.round_boat),
    noted: checkObj(item.noted),
  });

  const handleSave = (id) => {
    fetch("/api/yahoo/payments?id=" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify(tracking),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((error) => console.log(error))
      .finally(() => {
        props.onHide();
        search();
      });
  };

  const handleChange = (e) => {
    setTracking((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen="lg-down"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          แก้ไข (#{props.index + 1})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body scrollable="true">
        <div className="card mb-3">
          <div className="card-header">ข้อมูล</div>
          <div className="card-body">
            <p className="card-text">
              วันที่: <ShowDateTime date={item.created_at} option="d" />
              <br />
              Username: {item.username} |{" "}
              <span style={{ background: "yellow" }}>BidBy: {item.bid_by}</span>
              <br />
              Link:{" "}
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.link}
              </a>
              <br />
              User Noted: {item.remark}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 mb-2">
            <div className="form-group">
              <label className="form-label">Track Id</label>
              <input
                className="form-control"
                type="text"
                name="track_id"
                value={tracking.track_id}
                onChange={handleChange}
                autoFocus
              />
            </div>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <div className="form-group">
              <label className="form-label">Box No</label>
              <input
                className="form-control"
                type="text"
                name="box_id"
                value={tracking.box_id}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <div className="form-group">
              <label className="form-label">Weight (kg.)</label>
              <input
                className="form-control"
                type="number"
                name="weight"
                value={tracking.weight}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <div className="form-group">
              <label className="form-label">Round Boat</label>
              <input
                className="form-control"
                type="date"
                name="round_boat"
                value={tracking.round_boat}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={() => handleSave(item.id)}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ManageModal;
