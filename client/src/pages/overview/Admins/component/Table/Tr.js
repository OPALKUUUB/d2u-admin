import React, { useContext, useState } from "react";
import { AdminContext } from "../../../../../context/AdminProvider";
import { ManageModal } from "../Modal/ManageModal";
import Thead_Data from "./Thead_Data";
import { v4 as uuidv4 } from "uuid";
import { ShowDateTime } from "../../../../../components/ShowDateTime";

export function Tr({ item, index }) {
  const { filter } = useContext(AdminContext);
  const [manageModal, setManageModal] = useState(false);
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
            }
            return <td key={key}>{item[thead.name]}</td>;
          } else if (thead.id === 1) {
            return <th key={key}>{parseInt(filter.offset) + index + 1}</th>;
          } else {
            return (
              <td key={key}>
                <button
                  className="btn-sm btn-success"
                  onClick={() => setManageModal(true)}
                >
                  manage
                </button>
                <ManageModal
                  show={manageModal}
                  onHide={() => setManageModal(false)}
                  item={item}
                />
              </td>
            );
          }
        })}
      </tr>
    </>
  );
}
