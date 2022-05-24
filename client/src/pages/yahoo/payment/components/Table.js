import React, { useContext } from "react";
import { PaymentContext } from "../../../../context/PaymentProvider";
import { TableData } from "./TableData";

export const Table = () => {
  const { data } = useContext(PaymentContext);
  return (
    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {THEAD.map((head, index) => {
                  return (
                    <th scope="col" key={index}>
                      {head}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableData item={item} index={index} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const THEAD = [
  "#",
  "Date",
  "Order",
  "Username",
  "Link",
  "Bid",
  "ค่าโอน",
  "ค่าขนส่ง",
  "สถานะ",
  "Noted",
  "Manage",
];
