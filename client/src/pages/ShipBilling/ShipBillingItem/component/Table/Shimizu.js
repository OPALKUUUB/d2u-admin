import React, { useContext, useEffect, useState } from "react";
import { ShipBillingItemContext } from "../../ShipBillingItemProvider";

export const Shimizu = () => {
  const { shimizuOrders, baseRate, sumShimizu, setSumShimizu } = useContext(
    ShipBillingItemContext
  );
  useEffect(() => {
    let data = {};
    data = Calculate(shimizuOrders, baseRate);
    setSumShimizu(data);
  }, [shimizuOrders, baseRate]);
  if (shimizuOrders.length > 0) {
    return (
      <div>
        <h1>Shimizu</h1>
        <table className="table table-bordered mb-3">
          <thead>
            <tr>
              <th>#</th>
              <th>channel</th>
              <th>track_id</th>
              <th>box_no</th>
              <th>weight(real)</th>
              <th>price</th>
              <th>cod</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shimizuOrders.map((order, index) => {
              let key = ["shimizu", order.id].join("_");
              return (
                <Row key={key} data={order} index={index} rate={baseRate} />
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>total</td>
              <td>{sumShimizu.cod + sumShimizu.price}</td>
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
      <td>{index === 0 ? "shimizu" : ""}</td>
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
  if (weight === 0) {
    price = 0;
  } else if (baseRate.min && weight < 1) {
    price = 200;
  } else {
    let baseRateByWeight = CalBaseRateByWeight(weight);
    let rate =
      baseRate.rate < baseRateByWeight ? baseRate.rate : baseRateByWeight;
    price = weight * rate;
    price = Math.round(price * 100) / 100;
  }
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
