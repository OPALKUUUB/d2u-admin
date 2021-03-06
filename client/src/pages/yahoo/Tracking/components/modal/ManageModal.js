import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ShowDateTime } from "../../../../../components/ShowDateTime";
import { TrackingContext } from "../../../../../context/TrackingProvider";
import { ManageSlip } from "./ManageSlip";

function checkObj(obj) {
  return obj === null || obj === undefined ? "" : obj;
}

function ManageModal(props) {
  const { search } = useContext(TrackingContext);
  let item = props.item;
  const [trackId, setTrackId] = useState(checkObj(item.track_id));
  const [boxId, setBoxId] = useState(checkObj(item.box_id));
  const paymentId = checkObj(item.payment_id);
  const [weight, setWeight] = useState(checkObj(item.weight));
  const [roundBoat, setRoundBoat] = useState(checkObj(item.round_boat));
  const [done, setDone] = useState(item.done);
  const [noted, setNoted] = useState(item.noted);
  const [slipModal, setSlipModal] = useState(false);
  useEffect(() => {
    setTrackId(checkObj(item.track_id));
    setBoxId(checkObj(item.box_id));
    setWeight(checkObj(item.weight));
    setRoundBoat(checkObj(item.round_boat));
    setDone(item.done);
    setNoted(item.noted);
  }, [props.item]);
  const handleSave = (id) => {
    const obj = {
      addPoint: item.addPoint,
      point: item.point,
      username: item.username,
      bid: item.bid,
      track_id: trackId,
      box_id: boxId,
      weight: weight,
      round_boat: roundBoat,
      done: done,
      noted: noted,
    };
    fetch("/api/yahoo/trackings?id=" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          alert("Save success");
          props.onHide();
          search();
        } else {
          alert(json.message);
        }
      })
      .catch((error) => console.log(error));
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
          ??????????????? (#{props.index + 1})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body scrollable="true">
        <div className="card mb-3">
          <div className="card-header">??????????????????</div>
          <div className="card-body">
            <p className="card-text">
              ??????????????????: <ShowDateTime date={item.created_at} option="d" />
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
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
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
                value={boxId}
                onChange={(e) => setBoxId(e.target.value)}
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
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
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
                value={roundBoat}
                onChange={(e) => setRoundBoat(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-4 mb-2">
            <div className="form-group">
              <label className="form-label">Note</label>
              <input
                className="form-control"
                type="text"
                name="noted"
                value={noted}
                onChange={(e) => setNoted(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-2 mb-2">
            <button
              className="btn btn-success"
              type="button"
              onClick={() => setSlipModal(true)}
            >
              manage slip
            </button>
            <ManageSlip
              show={slipModal}
              onHide={() => setSlipModal(false)}
              id={paymentId}
            />
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
