import context from "bluebird/js/release/context";
import React, { useMemo } from "react";
import { useTable } from "react-table";
import { AllMartContext } from "../../context/AllMartProvider";

export const Table = () => {
  const data = useMemo(() => [{ id: 1, name: "seven", image: "image" }], []);
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "image",
        accessor: "image",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
