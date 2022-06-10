import React, { useContext, useMemo } from "react";
import { AllMartContext } from "../../context/AllMartProvider";
import { TableStyles } from "../../styles/MartStyles";

export const Table = () => {
  const { datas } = useContext(AllMartContext);
  const columns = useMemo(() => genColumn(), []);

  return (
    <>
      <TableStyles>
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.accessor}>{col.Header}</th>
              ))}
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={[col.accessor, data.id].join("-")}>
                    {data[col.accessor]}
                  </td>
                ))}
                <td>
                  <button className="btn-sm btn-primary me-3">Table</button>
                  <button className="btn-sm btn-success me-3">Edit</button>
                  <button className="btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableStyles>
    </>
  );
};

function genColumn() {
  return [
    {
      Header: "Id",
      accessor: "id", // accessor is the "key" in the data
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Image",
      accessor: "image",
    },
    { Header: "Description", accessor: "description" },
    { Header: "Category", accessor: "category" },
    { Header: "Tag", accessor: "tag" },
  ];
}
