import React, { useContext } from "react";
import { ShipBillingItemContext } from "../../ShipBillingItemProvider";
import styled from "styled-components";

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
  } = useContext(ShipBillingItemContext);
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
  sumPrice += shipBilling.cost_voyage2;
  let total = Math.ceil(sumPrice);
  return (
    <Styles>
      <table>
        <caption>
          {shipBilling.username} {shipBilling.round_boat}
        </caption>
        <thead>
          <tr>
            <th>Channel</th>
            <th>Box No.</th>
            <th>Track Id</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Cod</th>
          </tr>
        </thead>
        <tbody>
          {mercariOrders.length > 0 && (
            <>
              {mercariOrders.map((row, index) => {
                let price = 0;
                let weight = parseFloat(row.weight);
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
                    <td>{index === 0 && "Mercari"}</td>
                    <td>{row.box_id}</td>
                    <td>{row.track_id}</td>
                    <td>{row.weight}</td>
                    <td>{price}</td>
                    <td>{row.cod}</td>
                  </tr>
                );
              })}
            </>
          )}
          {frilOrders.length > 0 && (
            <>
              {frilOrders.map((row, index) => {
                let price = 0;
                let weight = parseFloat(row.weight);
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
                    <td>{index === 0 && "Fril"}</td>
                    <td>{row.box_id}</td>
                    <td>{row.track_id}</td>
                    <td>{row.weight}</td>
                    <td>{price}</td>
                    <td>{row.cod}</td>
                  </tr>
                );
              })}
            </>
          )}
          {shimizuOrders.length > 0 && (
            <>
              {shimizuOrders.map((row, index) => {
                return (
                  <tr>
                    <td>{index === 0 && "Shimizu"}</td>
                    <td>{row.box_id}</td>
                    <td>{row.track_id}</td>
                    <td>{row.weight}</td>
                    <td>-</td>
                    <td>{row.cod}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  sum
                </td>
                <td>{sumShimizu.weight}</td>
                <td>{sumShimizu.price}</td>
              </tr>
            </>
          )}
          {web123Orders.length > 0 && (
            <>
              {web123Orders.map((row, index) => {
                return (
                  <tr>
                    <td>{index === 0 && "เว็บทั่วไป"}</td>
                    <td>{row.box_id}</td>
                    <td>{row.track_id}</td>
                    <td>{row.weight}</td>
                    <td>-</td>
                    <td>{row.cod}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  sum
                </td>
                <td>{sumWeb123.weight}</td>
                <td>{sumWeb123.price}</td>
              </tr>
            </>
          )}
          {yahooOrders.length > 0 && (
            <>
              {yahooOrders.map((row, index) => {
                return (
                  <tr>
                    <td>{index === 0 && "Yahoo"}</td>
                    <td>{row.box_id}</td>
                    <td>{row.track_id}</td>
                    <td>{row.weight}</td>
                    <td>-</td>
                    <td>{row.cod}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  sum
                </td>
                <td>{sumYahoo.weight}</td>
                <td>{sumYahoo.price}</td>
              </tr>
            </>
          )}
        </tbody>
        <tfoot>
          {discount && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                Discount 5%
              </td>
              <td>{discount_price}</td>
            </tr>
          )}
          <tr>
            <td colSpan={3} style={{ textAlign: "center" }}>
              total
            </td>
            <td>{total}</td>
          </tr>
        </tfoot>
      </table>
    </Styles>
  );
};

const Styles = styled.div`
  border: 1px solid red;

  table {
    width: 500px;
    border: 1px solid blue;
  }
`;
