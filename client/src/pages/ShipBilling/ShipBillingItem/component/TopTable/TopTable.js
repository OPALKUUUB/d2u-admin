import React, { useContext, useEffect, useState } from "react";
import { ShipBillingItemContext } from "../../ShipBillingItemProvider";

export const TopTable = () => {
  const { trackings, discount, shipBilling, handleUpdateCostVoyage } =
    useContext(ShipBillingItemContext);
  const [costVoyage, setCostVoyage] = useState(shipBilling.cost_voyage1);
  useEffect(() => {
    setCostVoyage(shipBilling.cost_voyage1);
  }, [shipBilling]);
  const row = () => {
    let sum_price = 0;
    let sum_cod = 0;
    let datas = trackings
      .filter(
        (tracking) =>
          tracking.channel === "mercari" || tracking.channel === "fril"
      )
      .map((data) => {
        let weight = parseFloat(data.weight);
        if (weight < 1) {
          data.weight_cal = 0;
          data.price = 0;
        } else {
          data.weight_cal = Math.round((weight - 1) * 100) / 100;
          data.price = weight * 200;
        }
        sum_price += data.price;
        sum_cod += data.cod;
        return data;
      });
    sum_price = Math.round(sum_price * 100) / 100;
    let discount_price = sum_price * 0.05;
    let cost_voyage = 0;
    cost_voyage = shipBilling.cost_voyage1;
    let total = 0;
    if (discount) {
      total = sum_price + sum_cod + cost_voyage - discount_price;
    } else {
      total = sum_price + sum_cod + cost_voyage;
    }
    return (
      <>
        {datas.map((data) => (
          <TableData data={data} key={data.id} />
        ))}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>sum</td>
          <td>{sum_price}</td>
          <td>{sum_cod}</td>
        </tr>
        {discount && (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>discount 5%</td>
            <td>{discount_price}</td>
            <td></td>
          </tr>
        )}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>cost_voyage1</td>
          <td>{cost_voyage}</td>
          <td>
            <input
              type="number"
              style={{ width: "100px" }}
              value={costVoyage}
              onChange={(e) => setCostVoyage(e.target.value)}
            />
            <button
              onClick={() => {
                handleUpdateCostVoyage({
                  ...shipBilling,
                  cost_voyage1: costVoyage,
                });
              }}
            >
              save
            </button>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>total</td>
          <td>{total}</td>
        </tr>
      </>
    );
  };
  return (
    <table className="table table-bordered mb-3">
      <thead>
        <tr>
          <th>channel</th>
          <th>track_id</th>
          <th>weight(real)</th>
          <th>weight(cal)</th>
          <th>price</th>
          <th>cod</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{row()}</tbody>
    </table>
  );
};

const TableData = ({ data }) => {
  const { setTrigger } = useContext(ShipBillingItemContext);
  const [cod, setCod] = useState(data.cod);
  const handleSave = () => {
    fetch("/update/cod", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: data.id, cod: cod, channel: data.channel }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .finally(() => setTrigger((prev) => !prev));
  };
  return (
    <tr>
      <td>{data.channel}</td>
      <td>{data.track_id}</td>
      <td>{data.weight}</td>
      <td>{data.weight_cal}</td>
      <td>{data.price}</td>
      <td>{data.cod}</td>
      <td width={200}>
        <input
          type="number"
          style={{ width: "100px" }}
          value={cod}
          onChange={(e) => setCod(e.target.value)}
        />
        <button onClick={handleSave}>save</button>
      </td>
    </tr>
  );
};
