import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
const POST = {
  date: new Date().toISOString().split("T")[0],
  username: "",
  box_id: "",
  track_id: "",
  weight: "",
  round_boat: "",
  remark: "",
};

const AddShimizuModal = (props) => {
  const [post, setPost] = useState(POST);
  const [users, setUsers] = useState([]);
  const PostShimizu = async (body) => {
    const res = await fetch("/api/tracking/shimizu", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
    return res;
  };

  const handleChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let check_username = false;
    let date_regx = /\d{4}-\d{2}-\d{2}/gm;
    let check_date = post.date === "" ? false : date_regx.test(post.date);
    console.log(check_date);
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === post.username) {
        check_username = true;
        break;
      }
    }
    if (check_username && check_date) {
      const res = await PostShimizu(post);
      if (res.status) {
        alert(res.message);
        window.location.reload(false);
      } else {
        alert("add shimizu fail!");
      }
    } else if (check_username) {
      alert("กรุณาตวจสอบความถูกต้องของ username!");
    } else if (check_date) {
      alert("กรุณากรอกวันที่");
    }
  };
  const FetchUser = async () => {
    const res = await fetch("/api/overview/users/autocomplete", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
    }).then((res) => res.json());
    return res;
  };
  useEffect(() => {
    async function initial() {
      const res = await FetchUser();
      setUsers(res.data);
    }
    initial();
  }, []);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="add-shimizu-modal"
      fullscreen="lg-down"
    >
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="add-shimizu-modal">Add Shimizu</Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable="true">
          <div className="row">
            <div className="col-12 col-sm-4 mb-3">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  className="form-control"
                  type="date"
                  name="date"
                  value={post.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-4 mb-3">
              <div className="form-group">
                {/* <label className="form-label">Username</label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  value={post.username}
                  onChange={handleChange}
                /> */}
                <label htmlFor="Shimuzu-username" className="form-label">
                  Username (ถ้า submit fail ให้ตรวจสอบ username
                  ว่าถูกต้องหรือไม่)
                </label>
                <input
                  className="form-control"
                  list="datalistOptions"
                  id="Shimizu-username"
                  placeholder="Type to search..."
                  name="username"
                  value={post.username}
                  onChange={handleChange}
                />
                <datalist id="datalistOptions">
                  {users.map((item) => (
                    <option key={item.id} value={item.username} />
                  ))}
                </datalist>
              </div>
            </div>
            <div className="col-12 col-sm-4 mb-3">
              <div className="form-group">
                <label className="form-label">Box No.</label>
                <input
                  className="form-control"
                  type="text"
                  name="box_id"
                  value={post.box_id}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-4 mb-3">
              <div className="form-group">
                <label className="form-label">Track Id</label>
                <input
                  className="form-control"
                  type="text"
                  name="track_id"
                  value={post.track_id}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-4 mb-3">
              <div className="form-group">
                <label className="form-label">Weight (Kg.)</label>
                <input
                  className="form-control"
                  type="number"
                  name="weight"
                  value={post.weight}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-4 mb-3">
              <div className="form-group">
                <label className="form-label">Voyage</label>
                <input
                  className="form-control"
                  type="date"
                  name="round_boat"
                  value={post.round_boat}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col mb-3">
              <div className="form-group">
                <label className="form-label">Note</label>
                <input
                  className="form-control"
                  type="text"
                  name="remark"
                  value={post.remark}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddShimizuModal;
