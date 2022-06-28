import React, { useContext, useEffect, useState } from "react";
import { ShipBillingItemContext } from "../../ShipBillingItemProvider";

export const Web123 = () => {
  const { web123Orders, baseRate, sumWeb123, setSumWeb123, rateYen } =
    useContext(ShipBillingItemContext);
  useEffect(() => {
    let data = {};
    data = Calculate(web123Orders, baseRate);
    // console.log(web123Orders);
    setSumWeb123(data);
  }, [web123Orders, baseRate]);
  if (web123Orders.length > 0) {
    return (
      <div>
        <h1>Web123</h1>
        <table className="table table-bordered mb-3">
          <thead>
            <tr>
              <th>#</th>
              <th>channel</th>
              <th>track_id</th>
              <th>box_no</th>
              <th>weight(real)</th>
              <th>price</th>
              <th>cod(¥)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {web123Orders.map((order, index) => {
              let key = ["web123", order.id].join("_");
              return (
                <Row key={key} data={order} index={index} rate={baseRate} />
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>total</td>
              <td>{sumWeb123.cod * rateYen + sumWeb123.price}</td>
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
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{index === 0 ? "Web123" : ""}</td>
      <td>{data.track_id}</td>
      <td>{data.box_id}</td>
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
    </tr>
  );
}

function Calculate(orders, baseRate) {
  let cod = 0;
  let weight = 0;
  let price = 0;
  orders.forEach((order) => {
    cod += parseFloat(order.cod);
    weight += parseFloat(order.weight);
  });
  weight = Math.round(weight * 100) / 100;
  let baseRateByWeight = CalBaseRateByWeight(weight);
  let rate =
    baseRate.rate < baseRateByWeight ? baseRate.rate : baseRateByWeight;
  price = weight * rate;
  price = Math.round(price * 100) / 100;
  return { cod: cod, weight: weight, price: price };
}

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
