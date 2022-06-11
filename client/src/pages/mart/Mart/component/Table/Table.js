import React, { useContext, useMemo } from "react";
import { FrameImage, TableStyles } from "../../../styles/MartStyles";
import { useNavigate } from "react-router-dom";
import { MartContext } from "../../../context/MartProvider";

export const Table = ({ id }) => {
  const navigate = useNavigate();
  const { datas } = useContext(MartContext);
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
                    {col.accessor === "image" ? (
                      <FrameImage>
                        <img
                          src={data[col.accessor]}
                          alt={data[col.accessor]}
                        />
                      </FrameImage>
                    ) : (
                      data[col.accessor]
                    )}
                  </td>
                ))}
                <td>
                  <div className="d-flex flex-column me-3">
                    <button
                      className="btn-sm btn-secondary mb-1"
                      onClick={() => navigate("/mart/" + data.id)}
                    >
                      Table
                    </button>
                    <button
                      className="btn-sm btn-success mb-1"
                      onClick={() => navigate("/mart/edit/" + data.id)}
                    >
                      Edit
                    </button>
                    <button className="btn-sm btn-danger">Delete</button>
                  </div>
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
