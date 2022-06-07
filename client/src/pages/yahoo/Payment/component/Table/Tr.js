import React, { useContext, useState } from "react";
import { PaymentContext } from "../../../../../context/PaymentProvider";
import Thead_Data from "./Thead_Data";
import { v4 as uuidv4 } from "uuid";
import { ShowDateTime } from "../../../../../components/ShowDateTime";
import ManageModal from "../Modal/ManageModal";
import { ManagePic } from "../Modal/ManagePic";

export function Tr({ item, index }) {
  const { filter, search } = useContext(PaymentContext);
  const [manageModalShow, setManageModalShow] = useState(false);
  const [managePic, setManagePic] = useState(false);
  const handleDelete = (id) => {
    console.log(id);
    if (window.confirm("คุณแน่ใจที่จะลบ?")) {
      fetch("/api/yahoo/orders?id=" + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
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
      <tr
        key={item.id}
        style={{ background: item.inform_bill ? "#ddf7da" : "#f7f5da" }}
      >
        {Thead_Data.map((thead) => {
          let key = uuidv4();
          if (thead.name !== undefined) {
            if (thead.type === "date") {
              return (
                <td key={key} width={110}>
                  <ShowDateTime date={item[thead.name]} option="d" />
                </td>
              );
            } else if (thead.type === "image") {
              return (
                <td>
                  <img
                    src={item[thead.name]}
                    width={70}
                    alt={item[thead.name]}
                  />
                </td>
              );
            } else if (thead.type === "link") {
              let link = item[thead.name];
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
            } else if (thead.type === "checkbox") {
              return (
                <TdBid
                  bid={item[thead.name]}
                  bidBy={item[thead.by]}
                  index={item.id}
                  option={thead.option}
                />
              );
            } else if (thead.type === "option") {
              let map = {
                pending1: "รอค่าส่ง",
                pending2: "รอชำระ",
                pending3: "รอตรวจสอบ",
              };
              return <td key={key}>{map[item[thead.name]]}</td>;
            }
            return (
              <td key={key}>
                {item[thead.name]} {thead.unit}
              </td>
            );
          } else if (thead.id === 1) {
            return <th key={key}>{parseInt(filter.offset) + index + 1}</th>;
          } else {
            return (
              <td key={key}>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary btn-sm dropdown-toggle"
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
                      <ManageModal
                        show={manageModalShow}
                        onHide={() => setManageModalShow(false)}
                        index={index}
                        item={item}
                      />
                    </li>
                    {item.payment_id === null && (
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          variant="primary"
                          onClick={() => setManagePic(true)}
                        >
                          add slip
                        </button>
                        <ManagePic
                          show={managePic}
                          onHide={() => setManagePic(false)}
                          index={index}
                          item={item}
                        />
                      </li>
                    )}
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => handleDelete(item.id)}
                      >
                        ลบ
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            );
          }
        })}
      </tr>
    </>
  );
}

function isNotEmpty(value) {
  return value !== "" && value !== null && value !== undefined;
}
const TdBid = ({ bid, bidBy, index, option }) => {
  const { search } = useContext(PaymentContext);
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
