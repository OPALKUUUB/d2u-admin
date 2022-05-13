import React, { useContext } from "react";
import { PaymentContext } from "../../context/PaymentProvider";
import ManageModal from "./modal/ManageModal";
import { ShowDateTime } from "./ShowDateTime";

export const TableData = ({ index, item }) => {
  const { search } = useContext(PaymentContext);
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
        style={{ background: item.inform_bill ? "#ddf7da" : "#f7f5da" }}
      >
        <th scope="row">{index + 1}</th>
        <td>
          <ShowDateTime date={item.created_at} option="d" />
        </td>
        <TdImg imgsrc={item.imgsrc} />
        <td>{item.username}</td>
        <TdLink link={item.link} />
        <td>{item.bid} (¥)</td>
        <td>{item.tranfer_fee_injapan} (฿)</td>
        <td>{item.delivery_in_thai} (¥)</td>
        <td>
          {item.payment_status === "pending1" && "รอค่าส่ง"}
          {item.payment_status === "pending2" && "รอชำระ"}
          {item.payment_status === "pending3" && "รอตรวจสอบ"}
        </td>
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
