import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BottomTable } from "./component/BottomTable/BottomTable";
import { TopTable } from "./component/TopTable/TopTable";
import { UserContent } from "./component/UserContent/UserContent";

export const ShipBillingItem = () => {
  return (
    <>
      <UserContent />
      <div className="card mx-3">
        <div className="card-body">
          <TopTable />
          <BottomTable />
        </div>
      </div>
      {/* <div>
        <table>
          <thead>
            <th>channel</th>
            <th>track_id</th>
            <th>weight</th>
            <th>cod</th>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((m, i) => (
                <RowYahoo key={["row_yahoo", i].join("_")} row={m} index={i} />
              ))}
            {shimizu.length > 0 &&
              shimizu.map((m, i) => (
                <RowShimizu
                  key={["row_shimizu", i].join("_")}
                  row={m}
                  index={i}
                />
              ))}
            {web123.length > 0 &&
              web123.map((m, i) => (
                <RowWeb123
                  key={["row_web123", i].join("_")}
                  row={m}
                  index={i}
                />
              ))}
          </tbody>
        </table>
      </div> */}
    </>
  );
};

function RowMercari({ row, index }) {
  const [cod, setCod] = useState(row.cod);
  let weight = parseFloat(row.weight);
  let weight_cal = 0;
  if (weight > 1) {
    weight_cal = Math.round((weight - 1) * 100) / 100;
  }
  const track_id = row.track_id;
  return (
    <tr>
      <td>{index === 0 && row.channel}</td>
      <td>{track_id}</td>
      <td>{weight}</td>
      <td>{weight_cal}</td>
      <td>{row.price}</td>
      <td>{cod}</td>
      <td>
        <input
          style={{ width: "100px" }}
          type="number"
          value={cod}
          onChange={(e) => setCod(e.target.value)}
        />
        <button>save</button>
      </td>
    </tr>
  );
}
function RowFril({ row, index }) {
  const [cod, setCod] = useState(row.cod);
  let weight = parseFloat(row.weight);
  let weight_cal = 0;
  if (weight > 1) {
    weight_cal = Math.round((weight - 1) * 100) / 100;
  }
  const track_id = row.track_id;
  return (
    <tr>
      <td>{index === 0 && row.channel}</td>
      <td>{track_id}</td>
      <td>{weight}</td>
      <td>{weight_cal}</td>
      <td>0</td>
      <td>{cod}</td>
      <td>
        <input
          style={{ width: "100px" }}
          type="number"
          value={cod}
          onChange={(e) => setCod(e.target.value)}
        />
      </td>
    </tr>
  );
}
function RowYahoo({ row, index }) {
  let weight = parseFloat(row.weight);
  const track_id = row.track_id;
  return (
    <tr>
      <td>{index === 0 && row.channel}</td>
      <td>{track_id}</td>
      <td>{weight}</td>
      <td>
        <input type="number" />
      </td>
    </tr>
  );
}
function RowShimizu({ row, index }) {
  let weight = parseFloat(row.weight);
  const track_id = row.track_id;
  return (
    <tr>
      <td>{index === 0 && row.channel}</td>
      <td>{track_id}</td>
      <td>{weight}</td>
      <td>
        <input type="number" />
      </td>
    </tr>
  );
}
function RowWeb123({ row, index }) {
  let weight = parseFloat(row.weight);
  const track_id = row.track_id;
  return (
    <tr>
      <td>{index === 0 && row.channel}</td>
      <td>{track_id}</td>
      <td>{weight}</td>
      <td>
        <input type="number" />
      </td>
    </tr>
  );
}
