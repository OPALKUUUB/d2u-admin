import React, { useContext, useEffect, useState } from "react";
import { ShipBillingItemContext } from "../../ShipBillingItemProvider";

export const BottomTable = () => {
  const {
    trackings,
    orders,
    baseRate,
    discount,
    shipBilling,
    handleUpdateCostVoyage,
  } = useContext(ShipBillingItemContext);
  const [costVoyage, setCostVoyage] = useState(shipBilling.cost_voyage2);
  useEffect(() => {
    setCostVoyage(shipBilling.cost_voyage2);
  }, [shipBilling]);
  const row = () => {
    let t1 = trackings.filter(
      (tracking) => tracking.channel === "shimizu" || tracking.channel === "123"
    );
    let datas = [...t1, ...orders];
    let sum_cod = 0;
    let sum_weight = 0;
    datas.forEach((data) => {
      sum_weight += parseFloat(data.weight);
      sum_cod += parseFloat(data.cod);
    });
    sum_weight = Math.round(sum_weight * 100) / 100;
    let sum_price = 0;
    let base_rate = 0;
    if (sum_weight === 0) {
      sum_price = 0;
    } else if (baseRate.min && sum_weight < 1 && sum_weight !== 0) {
      sum_price = 200;
    } else {
      let baseRateByWeight = CalBaseRateByWeight(sum_weight);
      base_rate =
        baseRate.rate < baseRateByWeight ? baseRate.rate : baseRateByWeight;
      sum_price = sum_weight * base_rate;
      sum_price = Math.round(sum_price * 100) / 100;
    }
    let discount_price = sum_price * 0.05;
    let cost_voyage = 0;
    cost_voyage = shipBilling.cost_voyage2;
    let total = 0;
    if (discount) {
      total = sum_price + sum_cod + cost_voyage - discount_price;
    } else {
      total = sum_price + sum_cod + cost_voyage;
    }

    return (
      <>
        {datas.map((data) => {
          let weight = parseFloat(data.weight);
          if (weight < 1) {
            weight = 0;
          } else {
            weight = Math.round((weight - 1) * 100) / 100;
          }
          return (
            <tr key={[data.id]}>
              <TableData data={data} />
            </tr>
          );
        })}
        <tr>
          <td></td>
          <td>total(base_rate=>{base_rate})</td>
          <td>{sum_weight}</td>
          <td>{sum_price}</td>
          <td>{sum_cod}</td>
        </tr>
        {discount && (
          <tr>
            <td></td>
            <td>discount 5%</td>
            <td></td>
            <td>{discount_price}</td>
            <td></td>
          </tr>
        )}
        <tr>
          <td></td>
          <td></td>
          <td>cost_voyage2</td>
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
                  cost_voyage2: costVoyage,
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

          <td>total</td>
          <td>{total}</td>
          <td></td>
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
    <>
      <td>{data.channel}</td>
      <td>{data.track_id}</td>
      <td>{data.weight}</td>
      <td>-</td>
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
    </>
  );
};

function CalBaseRateByWeight(weight) {
  if (weight >= 100) {
    return 140;
  } else if (weight >= 50 && weight < 100) {
    return 160;
  } else if (weight >= 10 && weight < 50) {
    return 180;
  }
  return 200;
}
