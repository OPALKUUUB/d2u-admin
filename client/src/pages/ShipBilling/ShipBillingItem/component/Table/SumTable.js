import React, { useContext, useEffect } from "react";
import { ShipBillingItemContext } from "../../ShipBillingItemProvider";

export const SumTable = () => {
  const {
    sumShimizu,
    sumWeb123,
    sumYahoo,
    sumMercari,
    sumFril,
    discount,
    shipBilling,
  } = useContext(ShipBillingItemContext);

  let cost_voyage1 = shipBilling.cost_voyage1;
  let cost_voyage2 = shipBilling.cost_voyage2;
  let price =
    sumShimizu.price +
    sumWeb123.price +
    sumYahoo.price +
    sumMercari.price +
    sumFril.price;
  let cod =
    sumShimizu.cod +
    sumWeb123.cod +
    sumYahoo.cod +
    sumMercari.cod +
    sumFril.cod;
  let discount_price = 0;
  if (discount) {
    discount_price = price * 0.05;
    discount_price = Math.round(discount_price * 100) / 100;
  }
  return (
    <div>
      <table className="table table-bordered mb-3">
        <thead>
          <tr>
            <th>channel</th>
            <th>price</th>
            <th>cod</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Mercari</th>
            <td>{sumMercari.price}</td>
            <td>{sumMercari.cod}</td>
          </tr>
          <tr>
            <th>Fril</th>
            <td>{sumFril.price}</td>
            <td>{sumFril.cod}</td>
          </tr>
          <tr>
            <th>Shimizu</th>
            <td>{sumShimizu.price}</td>
            <td>{sumShimizu.cod}</td>
          </tr>
          <tr>
            <th>Web123</th>
            <td>{sumWeb123.price}</td>
            <td>{sumWeb123.cod}</td>
          </tr>
          <tr>
            <th>Yahoo</th>
            <td>{sumYahoo.price}</td>
            <td>{sumYahoo.cod}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>sum</td>
            <td>{price}</td>
            <td>{cod}</td>
          </tr>
          <tr>
            <td>ค่าส่ง</td>
            <td>{cost_voyage1}</td>
            <td></td>
          </tr>
          <tr>
            <td>ส่วนลด</td>
            <td>{cost_voyage2}</td>
            <td></td>
          </tr>
          {discount && (
            <tr>
              <td>discount 5%</td>
              <td>{discount_price}</td>
              <td></td>
            </tr>
          )}
          <tr>
            <th>total</th>
            <td>{price + cod - discount - cost_voyage1 - cost_voyage2}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
