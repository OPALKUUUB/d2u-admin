import React, { useContext } from "react";
import { HistoryContext } from "../../context/HistoryProvider";
import ManageModal from "./modal/ManageModal";
import { ShowDateTime } from "./ShowDateTime";

export const TableData = ({ index, item }) => {
  const { search } = useContext(HistoryContext);
  const [manageModalShow, setManageModalShow] = React.useState(false);
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
        <td>{item.noted}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(item.id)}
          >
            delete
          </button>
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

const TdLink = ({ link }) => {
  return (
    <td>
      <a href={link} target="_blank" rel="noopener noreferrer">
        link
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
