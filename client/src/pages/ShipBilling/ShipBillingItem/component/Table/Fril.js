import React, { useContext, useEffect, useState } from "react";
import { ShipBillingItemContext } from "../../ShipBillingItemProvider";

export const Fril = () => {
  const { frilOrders, sumFril, setSumFril, rateYen } = useContext(
    ShipBillingItemContext
  );
  useEffect(() => {
    let data = {};
    data = Calculate(frilOrders);
    setSumFril(data);
  }, [frilOrders, setSumFril]);

  if (frilOrders.length > 0) {
    return (
      <div>
        <h1>Fril</h1>
        <table className="table table-bordered mb-3">
          <thead>
            <tr>
              <th>#</th>
              <th>channel</th>
              <th>track_id</th>
              <th>box no</th>
              <th>weight(real)</th>
              <th>weight(cal)</th>
              <th>price</th>
              <th>cod</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {frilOrders.map((order, index) => {
              let key = ["fril", order.id].join("_");
              return <Row key={key} data={order} index={index} />;
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>total</td>
              <td>{sumFril.weight}</td>
              <td></td>
              <td>{sumFril.cod * rateYen + sumFril.price}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

function Row({ data, index }) {
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
  let price = 0;
  let weight = parseFloat(data.weight);
  weight = Math.round(weight * 100) / 100;
  let weight_cal = weight;
  if (weight < 1) {
    price = 0;
    weight_cal = 0;
  } else {
    weight_cal -= 1;
    weight_cal = Math.round(weight_cal * 100) / 100;
    price = weight_cal * 200;
  }
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{index === 0 ? "Mercari" : ""}</td>
      <td>{data.track_id}</td>
      <td>{data.box_id}</td>
      <td>{data.weight}</td>
      <td>{weight_cal}</td>
      <td>{price}</td>
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
}

function Calculate(orders) {
  let cod = 0;
  let sum_weight = 0;
  let price = 0;
  orders.forEach((order) => {
    let weight = parseFloat(order.weight);
    weight = Math.round(weight * 100) / 100;
    let weight_cal = weight;
    sum_weight += weight;
    if (weight < 1) {
      price += 0;
      weight_cal = 0;
    } else {
      weight_cal -= 1;
      weight_cal = Math.round(weight_cal * 100) / 100;
      price += weight_cal * 200;
    }
    cod += parseFloat(order.cod);
  });
  sum_weight = Math.round(sum_weight * 100) / 100;
  return { cod: cod, weight: sum_weight, price: price };
}
