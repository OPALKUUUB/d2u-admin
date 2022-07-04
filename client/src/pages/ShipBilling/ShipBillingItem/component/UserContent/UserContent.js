import React, { useContext } from "react";
import { ShipBillingItemContext } from "../../ShipBillingItemProvider";

export const UserContent = () => {
  const {
    userInfo,
    baseRate,
    setBaseRate,
    discount,
    setDiscount,
    shipBilling,
    setShipBilling,
    handleUpdateCostVoyage,
  } = useContext(ShipBillingItemContext);
  const handleSaveCostVoyage = () => {
    handleUpdateCostVoyage(shipBilling);
  };
  console.log(shipBilling);
  if (shipBilling.id !== undefined) {
    return (
      <div className="card m-3">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <p>username: {userInfo.username}</p>
              <p>phone: {userInfo.phone}</p>
              <p>address: {userInfo.address}</p>
            </div>
            <div className="col">
              <p>point_new: {userInfo.point_new}</p>
              <p>point_old: {userInfo.point_old}</p>
              <p>
                base_rate:{" "}
                <input
                  type="number"
                  value={baseRate.rate}
                  onChange={(e) =>
                    setBaseRate({ ...baseRate, rate: e.target.value })
                  }
                />
              </p>
              <p>
                ค่าส่ง:{" "}
                <input
                  type="number"
                  value={shipBilling.cost_voyage1}
                  onChange={(e) =>
                    setShipBilling({
                      ...shipBilling,
                      cost_voyage1: e.target.value,
                    })
                  }
                />
                <button type="button" onClick={handleSaveCostVoyage}>
                  save
                </button>
              </p>
              <p>
                ส่วนลด:{" "}
                <input
                  type="number"
                  value={shipBilling.cost_voyage2}
                  onChange={(e) =>
                    setShipBilling({
                      ...shipBilling,
                      cost_voyage2: e.target.value,
                    })
                  }
                />
                <button type="button" onClick={handleSaveCostVoyage}>
                  save
                </button>
              </p>
              <p>
                <input
                  type="checkbox"
                  defaultChecked={discount}
                  onClick={() => setDiscount(!discount)}
                />{" "}
                discount 5%
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
