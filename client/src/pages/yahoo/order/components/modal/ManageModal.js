import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { OrderContext } from "../../../context/OrderProvider";
import { ShowDateTime } from "../ShowDateTime";

function ManageModal(props) {
  const { search } = useContext(OrderContext);
  let item = props.item;
  const [noted, setNoted] = useState(
    item.noted === null || item.noted === undefined ? "" : item.noted
  );
  const handleSave = (id) => {
    // console.log(id, noted);
    fetch("/api/yahoo/orders?id=" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify({
        noted: noted,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((error) => console.log(error))
      .finally(() => {
        props.onHide();
        search();
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
          <div className="col">
            <div className="form-group">
              <label className="form-label">Admin Noted</label>
              <input
                type="text"
                className="form-control"
                value={noted}
                onChange={(e) => setNoted(e.target.value)}
                autoFocus
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
