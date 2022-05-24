import React, { useContext } from "react";
import { HistoryContext } from "../../context/HistoryProvider";
import { useNavigate } from "react-router-dom";
import { ShowDateTime } from "./ShowDateTime";

export const TableData = ({ index, item }) => {
  let navigate = useNavigate();
  const { search } = useContext(HistoryContext);
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
  const handleManage = () => {
    navigate("/yahoo/historys/" + item.id + "?status=" + item.status);
  };
  return (
    <>
      <tr
        key={index}
        style={{ background: item.status === "win" ? "#ddf7da" : "#f7d0d1" }}
      >
        <th scope="row">{index + 1}</th>
        <td>
          <ShowDateTime date={item.created_at} option="d" />
        </td>
        <TdImg imgsrc={item.imgsrc} />
        <td>{item.username}</td>
        <TdLink link={item.link} />
        <td>{isNotEmpty(item.point) ? item.point : "-"}</td>
        <td>{item.noted}</td>
        <td>
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
                  onClick={handleManage}
                >
                  แก้ไข
                </button>
              </li>
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
      </tr>
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

const TdImg = ({ imgsrc }) => {
  return (
    <td>
      <img src={imgsrc} width={70} alt={imgsrc} />
    </td>
  );
};
