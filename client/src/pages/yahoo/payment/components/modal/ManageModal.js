import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PaymentContext } from "../../../../../context/PaymentProvider";
import { ShowDateTime } from "../ShowDateTime";

function ManageModal(props) {
  const { search } = useContext(PaymentContext);
  let item = props.item;
  const [bid, setBid] = useState(item.bid);
  const [tranferFee, setTranferFee] = useState(item.tranfer_fee_injapan);
  const [deliveryFee, setDeliveryFee] = useState(item.delivery_in_thai);
  const [informBill, setInformBill] = useState(item.inform_bill);
  const [status, setStatus] = useState(item.status);
  const [paymentStatus, setPaymentStatus] = useState(item.payment_status);
  const [noted, setNoted] = useState(
    item.noted === null || item.noted === undefined ? "" : item.noted
  );
  const handleSave = (id) => {
    let obj = {
      bid: bid,
      tranfer_fee_injapan: tranferFee,
      delivery_in_thai: deliveryFee,
      inform_bill: informBill,
      status: status,
      payment_status: paymentStatus,
      noted: noted,
    };
    fetch("/api/yahoo/payments?id=" + id, {
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
              <label className="form-label">Bid (yen.)</label>
              <input
                className="form-control"
                type="number"
                value={bid}
                onChange={(e) => setBid(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <div className="form-group">
              <label className="form-label">Tranfer Fee (bath.)</label>
              <input
                className="form-control"
                type="number"
                value={tranferFee}
                onChange={(e) => setTranferFee(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <div className="form-group">
              <label className="form-label">Delivery Fee (yen.)</label>
              <input
                className="form-control"
                type="number"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <div className="form-group">
              <label className="form-label">แจ้งชำระ</label>
              <select
                className="form-select"
                aria-label="inform bill"
                onChange={(e) => setInformBill(e.target.value)}
                defaultValue={item.inform_bill}
              >
                <option value="0">ยังไม่แจ้ง</option>
                <option value="1">แจ้งแล้ว</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                aria-label="status"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="win">win</option>
                <option value="lose">lose</option>
                <option value="Auction">auction</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <div className="form-group">
              <label className="form-label">Payment Status</label>
              <select
                className="form-select"
                aria-label="payment_status"
                onChange={(e) => setPaymentStatus(e.target.value)}
                value={paymentStatus}
              >
                <option value="pending1">รอค่าส่ง&ค่าโอน</option>
                <option value="pending2">รอชำระ</option>
                <option value="pending3">รอตรวจสอบ</option>
                <option value="paid">ชำระแล้ว</option>
              </select>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label className="form-label">Admin Noted</label>
              <input
                type="text"
                className="form-control"
                name="noted"
                value={noted}
                onChange={(e) => setNoted(e.target.value)}
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
