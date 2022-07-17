import React, { useContext, useEffect, useState } from "react";
import { ShowDateTime } from "../../../../components/ShowDateTime";
import { TrackingContext } from "../../../../context/TrackingProvider";
import ManageModal from "./modal/ManageModal";

export const TableData = ({ index, data }) => {
  const { search, setLoading } = useContext(TrackingContext);
  const [item, setItem] = useState(data);
  useEffect(() => {
    setItem(data);
  }, [data]);
  const [manageModalShow, setManageModalShow] = useState(false);
  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจที่จะลบ?")) {
      setLoading(true);
      await fetch("/api/yahoo/orders?id=" + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            search();
          } else {
            alert(data.message);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const handleCheck = async (id, obj) => {
    setLoading(true);
    await fetch("/yahoo/check/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          search();
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Update Check fail👎");
      })
      .finally(() => {
        setLoading(false);
      });
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
        <td>{item.track_id}</td>
        <td>{item.box_id}</td>
        <TdWeight weight={item.weight} />
        <td>
          <ShowDateTime date={item.round_boat} option="d" />
        </td>
        <td>
          <input
            type="checkbox"
            checked={item.paid}
            onClick={() =>
              handleCheck(item.id, { paid: item.paid === 0 ? 1 : 0 })
            }
          />
        </td>
        <td>
          <input
            type="checkbox"
            checked={item.comment}
            onClick={() =>
              handleCheck(item.id, { comment: item.comment === 0 ? 1 : 0 })
            }
          />
        </td>
        <td>{item.noted}</td>
        <td>{item.point}</td>
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
                  onClick={() => setManageModalShow(true)}
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
      <ManageModal
        show={manageModalShow}
        onHide={() => setManageModalShow(false)}
        index={index}
        item={item}
      />
    </>
  );
};

const TdWeight = ({ weight }) => {
  return <td>{weight === "" || weight === null ? "-" : `${weight} (kg.)`}</td>;
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

// function isNotEmpty(value) {
//   return value !== "" && value !== null && value !== undefined;
// }

const TdImg = ({ imgsrc }) => {
  return (
    <td>
      <img src={imgsrc} width={70} alt={imgsrc} />
    </td>
  );
};
