import React, { useContext, useState } from "react";
import { OrderContext } from "../../../../../context/OrderProvider";
import Thead_Data from "./Thead_Data";
import { v4 as uuidv4 } from "uuid";
import { ShowDateTime } from "../../../../../components/ShowDateTime";
import { ManageModal } from "../Modal/ManageModal";
import { WinModal } from "../Modal/WinModal";

export function Tr({ item, index }) {
  const { filter, handleLose } = useContext(OrderContext);
  const [manageModal, setManageModal] = useState(false);
  const [winModal, setWinModal] = useState(false);
  return (
    <>
      <tr key={item.id}>
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
            }
            return <td key={key}>{item[thead.name]}</td>;
          } else if (thead.id === 1) {
            return <th key={key}>{parseInt(filter.offset) + index + 1}</th>;
          } else {
            return (
              <td key={key}>
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
                        onClick={() => setManageModal(true)}
                      >
                        แก้ไข
                      </button>
                      <ManageModal
                        show={manageModal}
                        onHide={() => setManageModal(false)}
                        item={item}
                      />
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => setWinModal(true)}
                      >
                        ชนะ
                      </button>
                      <WinModal
                        show={winModal}
                        onHide={() => setWinModal(false)}
                        item={item}
                      />
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
