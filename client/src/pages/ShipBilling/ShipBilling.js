import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ShipBilling = () => {
  const [voyages, setVoyages] = useState([]);
  const [voyage, setVoyage] = useState("");
  const [billings, setBillings] = useState([]);
  const FetchVoyage = async () => {
    const res = await fetch("/group/round_boat").then((res) => res.json());
    return res.data;
  };
  useEffect(() => {
    async function getInitial() {
      const data = await FetchVoyage();
      setVoyages(data);
    }
    getInitial();
  }, []);
  const FetchBillingVoyage = async (v) => {
    const res = await fetch("/billing/voyage?round_boat=" + v).then((res) =>
      res.json()
    );
    return res.data;
  };
  const handleSelect = async (e) => {
    setVoyage(e.target.value);
    const data = await FetchBillingVoyage(e.target.value);
    console.log(data);
    setBillings(data);
  };
  return (
    <div>
      เลือกรอบเรือ:{" "}
      {voyages.length > 0 ? (
        <select name="voyage" value={voyage} onChange={handleSelect}>
          <option value="">select</option>
          {voyages.map((v, i) => {
            return (
              <option key={["voyage", i].join("_")} value={v.round_boat}>
                {v.round_boat}
              </option>
            );
          })}
        </select>
      ) : (
        "loading..."
      )}
      {billings.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>weight_sum</th>
              <th>inform_billing</th>
              <th>manage</th>
            </tr>
          </thead>
          <tbody>
            {billings.map((b, i) => {
              return (
                <tr key={["row_billing", i].join("_")}>
                  <RowShipBilling row={b} />
                  <td>
                    <Link
                      to={`/ship/billing/manage?username=${b.username}&round_boat=${voyage}`}
                    >
                      link
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const RowShipBilling = ({ row }) => {
  const [check, setCheck] = useState(row.billing_check);
  const weight = Math.round(row.weight_sum * 100) / 100;
  return (
    <>
      <td>{row.username}</td>
      <td>{weight}</td>
      <td>
        <input
          type="checkbox"
          defaultChecked={check}
          onClick={() => setCheck(!check)}
        />
      </td>
    </>
  );
};
