import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { OrderContext } from "../../../../../context/OrderProvider";
import { ShowDateTime } from "../ShowDateTime";
function WinModal(props) {
  let item = props.item;
  const { search } = useContext(OrderContext);
  const [bid, setBid] = useState(0);
  const [tranferFee, setTranferFee] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("pending1");
  const [noted, setNoted] = useState(
    item.noted === null || item.noted === undefined ? "" : item.noted
  );
  useEffect(() => {
    setBid(0);
    setTranferFee(0);
    setDeliveryFee(0);
    setPaymentStatus("pending1");
    setNoted(item.noted === null || item.noted === undefined ? "" : item.noted);
  }, []);
  const handleSave = (id) => {
    if (bid === 0) {
      alert("กรุณาใส่ราคาที่ประมูลได้!");
    } else if (window.confirm("คุณแน่ใจที่จะเปลี่ยนแปลงสถานะ(win)?")) {
      fetch("/api/yahoo/orders?id=" + id + "&win=win", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
        body: JSON.stringify({
          status: "win",
          bid: bid,
          tranfer_fee_injapan: tranferFee,
          delivery_in_thai: deliveryFee,
          payment_status: paymentStatus,
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
    }
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
          ชนะ ({props.index + 1})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <div className="col-12 col-md-6">
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
          <div className="col-12 col-md-6">
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
          <div className="col-12 col-md-6">
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
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="form-label">Payment Status</label>
              <select
                className="form-select"
                aria-label="payment_status"
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option value="pending1">รอค่าส่ง&ค่าโอน</option>
                <option value="pending2">รอการชำระ</option>
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
                value={
                  item.noted === null || item.noted === undefined
                    ? ""
                    : item.noted
                }
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

export default WinModal;
