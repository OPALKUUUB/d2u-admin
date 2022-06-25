import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export const ShipBilling = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
  useEffect(() => {
    async function getInitial() {
      const data = await FetchBillingVoyage(date);
      setBillings(data);
    }
    let date = searchParams.get("round_boat");
    if (date !== null) {
      let reg_date_pattern = /^\d{4}-\d{2}-\d{2}/;
      if (reg_date_pattern.test(date)) {
        setVoyage(date);
        getInitial();
      }
    }
  }, [searchParams]);
  const FetchBillingVoyage = async (v) => {
    const res = await fetch("/billing/voyage?round_boat=" + v).then((res) =>
      res.json()
    );
    return res.data;
  };
  const handleSelect = async (e) => {
    setSearchParams({ round_boat: e.target.value });
    setVoyage(e.target.value);
    const data = await FetchBillingVoyage(e.target.value);
    setBillings(data);
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-3">
          <label className="me-3">เลือกรอบเรือ:</label>
          {voyages.length > 0 ? (
            <select
              name="voyage"
              value={voyage}
              onChange={handleSelect}
              style={{ width: "200px" }}
            >
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
        </div>
        {billings.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>username</th>
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
    </div>
  );
};

const RowShipBilling = ({ row }) => {
  const [ck, setCk] = useState(row.billing_check);
  useEffect(() => {
    setCk(row.billing_check);
  }, [row]);
  const PatchInformBilling = async (id, patch) => {
    await fetch("/ship/billing/update/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  const handleCheck = async (check) => {
    setCk(check);
    let patch = {
      billing_check: check,
    };
    await PatchInformBilling(row.id, patch);
  };
  return (
    <>
      <td>{row.username}</td>
      <td>
        <input type="checkbox" checked={ck} onChange={() => handleCheck(!ck)} />
      </td>
    </>
  );
};
