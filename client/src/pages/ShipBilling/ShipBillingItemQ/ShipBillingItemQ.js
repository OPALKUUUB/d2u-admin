import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const ShipBillingItemQ = () => {
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState(1);
  const [costDeliveryQ, setCostDeliveryQ] = useState(0);
  const [order, setOrder] = useState([]);
  const shipBillingId = useRef("");
  const FetchShipBilling = async () => {
    const username = searchParams.get("username");
    const round_boat = searchParams.get("round_boat");
    const res = await fetch(
      "/shipbilling?username=" + username + "&round_boat=" + round_boat
    ).then((res) => res.json());
    return res;
  };
  const handlePatchShipBilling = async (id, patch) => {
    console.log(patch, id);
    const res = await fetch("/ship/billing/update/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    // console.log(res);
    return res;
  };
  const handleSaveCostDeliveryQ = async () => {
    const obj = { cost_delivery_q: costDeliveryQ };
    const id = shipBillingId.current;
    await handlePatchShipBilling(id, obj);
  };
  useEffect(() => {
    async function getInitial() {
      const res = await FetchShipBilling();
      shipBillingId.current = res.ship_billing.id;
      setCostDeliveryQ(res.ship_billing.cost_delivery_q);
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
  total += parseFloat(costDeliveryQ);
  return (
    <div
      style={{
        width: "90vw",
        margin: "0 auto",
        marginTop: "30px",
      }}
    >
      <div>
        <div>
          <label>กำหนดคิว: </label>
          <input
            type="number"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />{" "}
          Q (200 Kg./Q, ส่วนเกินกิโลกรัมละ 150 บาท, 1Q = 15,000 บาท)
        </div>
        <div>
          <label>เพิ่มค่าส่ง: </label>
          <input
            type="number"
            value={costDeliveryQ}
            onChange={(e) => setCostDeliveryQ(e.target.value)}
          />
          <button type="button" onClick={handleSaveCostDeliveryQ}>
            save
          </button>
        </div>
      </div>
      {order.length > 0 ? (
        <Styles>
          <table>
            <thead>
              <tr>
                <th colSpan={6} style={{ textAlign: "center" }}>
                  {searchParams.get("username")}{" "}
                  {searchParams.get("round_boat")}
                </th>
              </tr>
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
                <td id="sum">{Math.round(sum_weight * 100) / 100} Kg.</td>
              </tr>
              <tr>
                <td colSpan={3}>ค่าส่ง</td>
                <td id="sum">{Math.round(costDeliveryQ * 100) / 100} bath.</td>
              </tr>
              <tr>
                <td colSpan={3}>total</td>
                <td id="total">{Math.round(total * 100) / 100} bath.</td>
              </tr>
            </tfoot>
          </table>
        </Styles>
      ) : (
        <>loading...</>
      )}
    </div>
  );
};

export default ShipBillingItemQ;

const Styles = styled.div`
  margin-bottom: 50px;
  margin-top: 30px;
  table {
    width: 70%;
  }
  th,
  td {
    padding: 8px 15px;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  thead tr {
    background-color: #ddd;
  }
  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tbody tr:hover {
    background-color: #ddd;
  }
  tbody td {
    padding: 5px;
  }
  th {
    text-align: left;
  }
  #sum,
  #total {
    font-weight: 600;
  }
  #sum {
    text-align: center;
  }
  #total {
    text-align: center;
    border-bottom: 5px double black;
  }
`;
