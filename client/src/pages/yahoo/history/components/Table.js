import React, { useContext } from "react";
import { HistoryContext } from "../../../../context/HistoryProvider";
import { TableData } from "./TableData";

export const Table = ({ thead = THEAD }) => {
  const { data } = useContext(HistoryContext);
  return (
    <Layout>
      <thead>
        <tr>
          {thead.map((head, index) => {
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
    </Layout>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">{children}</table>
        </div>
      </div>
    </div>
  );
};

let THEAD = [
  "#",
  "Date",
  "Order",
  "Username",
  "Link",
  "Point",
  "Noted",
  "Manage",
];
