import React, { useContext } from "react";
import { TrackingContext } from "../../context/TrackingProvider";
import { TableData } from "./TableData";

export const Table = () => {
  const { data } = useContext(TrackingContext);
  console.log(data);
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
  "Track Id",
  "Box No.",
  "Weight",
  "Round Boat",
  "Noted",
  "Manage",
];
