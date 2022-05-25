import React, { useContext } from "react";
import { OrderContext } from "../../../../context/OrderProvider";
import ManageModal from "./modal/ManageModal";
import WinModal from "./modal/WinModal";
import { ShowDateTime } from "./ShowDateTime";

export const TableData = ({ index, item }) => {
  const { search } = useContext(OrderContext);
  const [manageModalShow, setManageModalShow] = React.useState(false);
  const [winModalShow, setWinModalShow] = React.useState(false);
  const handleLose = (id) => {
    if (window.confirm("คุณแน่ใจที่จะเปลี่ยนแปลงสถานะ(lose)?")) {
      fetch("/api/yahoo/orders?id=" + id + "&win=win", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
        body: JSON.stringify({
          status: "lose",
        }),
      })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((error) => console.log(error))
        .finally(() => {
          search();
        });
    }
  };
  return (
    <>
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>
          <ShowDateTime date={item.created_at} option="d" />
        </td>
        <TdImg imgsrc={item.imgsrc} />
        <td>{item.username}</td>
        <TdLink link={item.link} />
        <TdBid
          bid={item.maxbid}
          bidBy={item.maxbid_work_by}
          index={item.id}
          option={0}
        />
        <TdBid
          bid={item.addbid1}
          bidBy={item.addbid1_work_by}
          index={item.id}
          option={1}
        />
        <TdBid
          bid={item.addbid2}
          bidBy={item.addbid2_work_by}
          index={item.id}
          option={2}
        />
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
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => handleLose(item.id)}
                >
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
        item={item}
      />
      <WinModal
        show={winModalShow}
        onHide={() => setWinModalShow(false)}
        index={index}
        item={item}
      />
    </>
  );
};

const TdLink = ({ link }) => {
  let temp_split = link.split("/");
  let temp_last = temp_split[temp_split.length - 1];
  let temp_clear = temp_last.split("?")[0];
  return (
    <td>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {temp_clear}
      </a>
    </td>
  );
};

function isNotEmpty(value) {
  return value !== "" && value !== null && value !== undefined;
}
const TdBid = ({ bid, bidBy, index, option, value }) => {
  const { search } = useContext(OrderContext);
  let id = index;
  if (bid === "" || bid === null || bid === undefined) {
    return <td>-</td>;
  }

  const handleChange = (ck) => {
    fetch(`/api/yahoo/orders?id=${id}&ck=${ck}&option=${option}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((error) => console.log(error))
      .finally(() => search());
  };
  return (
    <td>
      <p className="mb-0 text-center">{bid} (¥)</p>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultChecked={isNotEmpty(bidBy) ? true : false}
          id={`TdBid-${index}`}
          onChange={(e) => handleChange(e.target.checked)}
        />
        <label className="form-check-label" htmlFor={`TdBid-${index}`}>
          {isNotEmpty(bidBy) ? bidBy : "-"}
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
