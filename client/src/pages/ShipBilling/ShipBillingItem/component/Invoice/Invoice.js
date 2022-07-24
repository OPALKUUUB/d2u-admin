import React, { useContext } from "react";
import { ShipBillingItemContext } from "../../ShipBillingItemProvider";
import styled from "styled-components";
import { Mercari } from "./Mercari";
import { Web123 } from "./Web123";
import { Fril } from "./Fril";
import { Shimizu } from "./Shimizu";
import { Yahoo } from "./Yahoo";

const warning_username = [
  "Giotto",
  "April",
  "Tiewstaff",
  "AdminNatsu",
  "AdminSeririnz",
];
export const Invoice = () => {
  const {
    shipBilling,
    sumShimizu,
    sumMercari,
    sumFril,
    sumWeb123,
    sumYahoo,
    discount,
    shimizuOrders,
    mercariOrders,
    frilOrders,
    web123Orders,
    yahooOrders,
    rateYen,
    allOrders,
    baseRate,
  } = useContext(ShipBillingItemContext);

  let ck = false;
  for (let i = 0; i < warning_username.length; i++) {
    if (shipBilling.username === warning_username[i]) {
      ck = true;
    }
  }
  if (ck) {
    // console.log(allOrders.length);
    return (
      <Styles>
        <table id="invoice">
          <thead>
            <tr>
              <th colSpan={6} style={{ textAlign: "center" }}>
                {shipBilling.username} {shipBilling.round_boat}
              </th>
            </tr>
            <tr>
              <th>Channel</th>
              <th>Box No.</th>
              <th>Track Id</th>
              <th>Weight</th>
              <th>Cod(yen)</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.length > 0 ? (
              <Body
                orders={allOrders}
                rate={baseRate}
                discount={discount}
                shipBilling={shipBilling}
                rateYen={rateYen}
              />
            ) : (
              "Loading..."
            )}
          </tbody>
        </table>
      </Styles>
    );
  } else {
    let sumPrice =
      sumShimizu.price +
      sumWeb123.price +
      sumYahoo.price +
      sumMercari.price +
      sumFril.price;
    let sumCod =
      sumShimizu.cod +
      sumWeb123.cod +
      sumYahoo.cod +
      sumMercari.cod +
      sumFril.cod;
    let discount_price = 0;
    if (discount) {
      discount_price = sumPrice * 0.05;
      discount_price = Math.floor(discount_price);
      sumPrice -= discount_price;
    }
    sumPrice += sumCod * rateYen;
    sumPrice += shipBilling.cost_voyage1;
    sumPrice -= shipBilling.cost_voyage2;
    let total = Math.ceil(sumPrice);
    return (
      <Styles>
        <table id="invoice">
          <thead>
            <tr>
              <th colSpan={6} style={{ textAlign: "center" }}>
                {shipBilling.username} {shipBilling.round_boat}
              </th>
            </tr>
            <tr>
              <th>Channel</th>
              <th>Box No.</th>
              <th>Track Id</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Cod(yen)</th>
            </tr>
          </thead>
          <tbody>
            <Mercari order={mercariOrders} />
            <Fril order={frilOrders} />
            <Shimizu order={shimizuOrders} sum={sumShimizu} />
            <Web123 order={web123Orders} sum={sumWeb123} />
            <Yahoo order={yahooOrders} sum={sumYahoo} />
          </tbody>
          <tfoot>
            {discount ? (
              <tr id="sum">
                <th id="head" colSpan={4}>
                  Discount 5%
                </th>
                <td id="price">{discount_price}</td>
                <td></td>
              </tr>
            ) : (
              <></>
            )}
            <tr id="sum">
              <th id="head" colSpan={4}>
                Delivery Cost
              </th>
              <td id="price">{shipBilling.cost_voyage1}</td>
              <td></td>
            </tr>
            <tr id="sum">
              <th id="head" colSpan={4}>
                Total
              </th>
              <td id="total">{total}</td>
              <th>Bath</th>
            </tr>
          </tfoot>
        </table>
      </Styles>
    );
  }
};

const Styles = styled.div`
  #invoice {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  #invoice text-decoration,
  #invoice th {
    padding: 8px 15px;
  }
  #invoice th,
  #invoice td {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  #invoice thead tr {
    background-color: #ddd;
  }
  #invoice tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  #invoice tbody tr:hover {
    background-color: #ddd;
  }
  #invoice tbody td {
    padding: 5px;
  }
  #invoice th {
    text-align: left;
  }
  #invoice #sum td {
    text-align: right;
  }
  #invoice #price {
    text-align: center;
    background-color: yellow;
  }
  #invoice #sum #total {
    text-align: center;
    background-color: yellowgreen;
    border-bottom: 5px double black;
  }
  #invoice #sum #head {
    text-align: right;
  }
`;

const Body = ({ orders, rate, shipBilling, discount, rateYen }) => {
  // console.log(rate.rate);
  let sum_weight = 0;
  let sum_cod = 0;
  for (let i = 0; i < orders.length; i++) {
    sum_weight += parseFloat(orders[i].weight);
    sum_cod += parseFloat(orders[i].cod);
  }
  sum_cod *= rateYen;
  sum_cod = Math.ceil(sum_cod * 100) / 100;
  sum_weight = sum_weight.toFixed(2);
  let price_sum_weight = sum_weight * 200;
  let discount_price = 0;
  if (discount) {
    discount_price = price_sum_weight * 0.05;
    discount_price = Math.floor(discount_price * 100) / 100;
    discount_price = discount_price.toFixed(2);
    price_sum_weight -= discount_price;
  }
  price_sum_weight += parseFloat(shipBilling.cost_voyage1);
  price_sum_weight -= parseFloat(shipBilling.cost_voyage2);
  price_sum_weight += sum_cod;
  price_sum_weight = price_sum_weight.toFixed(2);
  return (
    <>
      {orders.map((order) => (
        <tr key={order.id}>
          <td>{order.channel}</td>
          <td>{order.box_id}</td>
          <td>{order.track_id}</td>
          <td>{parseFloat(order.weight).toFixed(2)}</td>
          <td>{parseFloat(order.cod).toFixed(2)}</td>
        </tr>
      ))}
      <tr>
        <td colSpan={3}>sum weight</td>
        <td>{sum_weight}</td>
        <td>Kg.</td>
      </tr>
      {sum_cod > 0 && (
        <tr>
          <td colSpan={3}>COD</td>
          <td>{sum_cod}</td>
          <td>bath.</td>
        </tr>
      )}
      {discount === 1 && (
        <tr>
          <td colSpan={3}>discount 5%</td>
          <td>{discount_price}</td>
          <td>bath</td>
        </tr>
      )}
      {shipBilling.cost_voyage1 > 0 && (
        <tr>
          <td colSpan={3}>ค่าส่ง</td>
          <td>{shipBilling.cost_voyage1}</td>
          <td>bath</td>
        </tr>
      )}
      {shipBilling.cost_voyage2 > 0 && (
        <tr>
          <td colSpan={3}>ส่วนลด</td>
          <td>{shipBilling.cost_voyage2}</td>
          <td>bath</td>
        </tr>
      )}

      <tr>
        <td colSpan={3}>total</td>
        <td>{price_sum_weight}</td>
        <td>bath</td>
      </tr>
    </>
  );
};
