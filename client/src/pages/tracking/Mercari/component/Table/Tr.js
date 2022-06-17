import React, { useContext, useState } from "react";
// import { ManageModal } from "../Modal/ManageModal";
import Thead_Data from "./Thead_Data";
import { v4 as uuidv4 } from "uuid";
import { ShowDateTime } from "../../../../../components/ShowDateTime";
import { AllTrackingContext } from "../../../../../context/AllTrackingProvider";
import { ManageModal } from "../Modal/ManageModal";
import { ManagePic } from "../Modal/ManagePic";
import { ShowImage } from "../../../../../components/ShowImage/ShowImage";

export function Tr({ item, index }) {
  const { filter, DeleteTracking } = useContext(AllTrackingContext);
  const [manageModal, setManageModal] = useState(false);
  const [managePic1Modal, setManagePic1Modal] = useState(false);
  const [managePic2Modal, setManagePic2Modal] = useState(false);
  return (
    <>
      <tr key={item.id}>
        {Thead_Data.map((thead) => {
          // let key = [thead.name, item.id].join("_");
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
                <td key={key}>
                  <ShowImage src={item[thead.name]} />
                </td>
              );
            } else if (thead.type === "link") {
              let link = item[thead.name];
              let temp_split = link.split("/");
              let temp_last = temp_split[temp_split.length - 1];
              let temp_clear = temp_last.split("?")[0];
              return (
                <td key={key}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {temp_clear}
                  </a>
                </td>
              );
            } else if (thead.type === "checkbox") {
              return (
                <TdCheckBox
                  key={key}
                  name={thead.name}
                  value={item[thead.name]}
                  index={item.id}
                  item={item}
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
                    className="btn-sm btn-secondary dropdown-toggle"
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
                        onClick={() => setManagePic1Modal(true)}
                      >
                        pic1
                      </button>
                      <ManagePic
                        show={managePic1Modal}
                        onHide={() => setManagePic1Modal(false)}
                        name="pic1_filename"
                        item={item}
                      />
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => setManagePic2Modal(true)}
                      >
                        pic2
                      </button>
                      <ManagePic
                        show={managePic2Modal}
                        onHide={() => setManagePic2Modal(false)}
                        name="pic2_filename"
                        item={item}
                      />
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => DeleteTracking(item.id)}
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

const TdCheckBox = ({ value, index, option, name, item }) => {
  const { PatchTracking } = useContext(AllTrackingContext);
  const handleCheck = (ck) => {
    let t = item;
    t[name] = ck ? 1 : 0;
    PatchTracking(index, t);
  };
  return (
    <td>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultChecked={value === null || value === 0 ? false : true}
          id={`TdCheckbox-${index}`}
          onChange={(e) => handleCheck(e.target.checked)}
        />
      </div>
    </td>
  );
};
