import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ShipBillingItemQ = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState(1);
  const [order, setOrder] = useState([]);
  const FetchShipBilling = async () => {
    const username = searchParams.get("username");
    const round_boat = searchParams.get("round_boat");
    const res = await fetch(
      "/shipbilling?username=" + username + "&round_boat=" + round_boat
    ).then((res) => res.json());
    return res;
  };
  useEffect(() => {
    async function getInitial() {
      const res = await FetchShipBilling();
      setOrder([...res.orders, ...res.trackings]);
    }
    getInitial();
  }, [searchParams]);
  const Q = 15000;
  let sum_weight = 0;
  let total = 0;
  order.forEach((item) => {
    sum_weight += parseFloat(item.weight);
  });
  if (q * 200 > sum_weight) {
    total = q * Q;
  } else {
    total = q * Q + 150 * (sum_weight - 200 * q);
  }
  console.log(total);
  return (
    <div
      style={{
        width: "90vw",
        margin: "0 auto",
        marginTop: "30px",
      }}
    >
      <div>
        <input type="number" value={q} onChange={(e) => setQ(e.target.value)} />{" "}
        Q (200 Kg./Q, ส่วนเกินกิโลกรัมละ 150 บาท, 1Q = 15,000 บาท)
      </div>
      {order.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>channel</th>
              <th>track_id</th>
              <th>box_no</th>
              <th>weight</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item) => {
              return (
                <tr key={[item.channel, item.id].join("_")}>
                  <td>{item.channel}</td>
                  <td>{item.track_id}</td>
                  <td>{item.box_id}</td>
                  <td>{item.weight}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>sum weight</td>
              <td>{Math.round(sum_weight * 100) / 100}</td>
            </tr>
            <tr>
              <td colSpan={3}>sum price</td>
              <td>{total}</td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <>loading...</>
      )}
    </div>
  );
};

export default ShipBillingItemQ;
