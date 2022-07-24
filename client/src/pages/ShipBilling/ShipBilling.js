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
      // console.log(data);
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
                <th>paid</th>
                <th>ที่อยู่จัดส่ง</th>
                <th>แจ้งวางบิล</th>
                <th>check</th>
                <th>remark</th>
                <th>manage</th>
              </tr>
            </thead>
            <tbody>
              {billings
                .sort((a, b) => {
                  let ua = a.username.toLowerCase(),
                    ub = b.username.toLowerCase();
                  if (ua < ub) {
                    return -1;
                  }
                  if (ua > ub) {
                    return 1;
                  }
                  return 0;
                })
                .map((b, i) => {
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
  const [ck2, setCk2] = useState(row.check);
  const [remark, setRemark] = useState(row.remark);
  const [paid, setPaid] = useState(row.paid);
  const [address, setAddress] = useState(row.address);
  const [edit, setEdit] = useState(false);
  const [edit1, setEdit1] = useState(false);
  useEffect(() => {
    setCk(row.billing_check);
    setCk2(row.check);
    setRemark(row.remark);
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
  const handleCheck2 = async (check) => {
    setCk2(check);
    let patch = {
      check: check,
    };
    await PatchInformBilling(row.id, patch);
  };
  const handleSaveRemark = async () => {
    let patch = {
      remark: remark,
    };
    await PatchInformBilling(row.id, patch);
    setEdit(false);
  };
  const handleSavePaid = async (e) => {
    setPaid(e.target.value);
    let patch = {
      paid: e.target.value,
    };
    await PatchInformBilling(row.id, patch);
  };
  const handleSaveAddress = async (e) => {
    let patch = {
      address: address,
    };
    await PatchInformBilling(row.id, patch);
    setEdit1(false);
  };
  const handleSetUserAddress = async () => {
    await fetch("/user/address?username=" + row.username)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setAddress(data.address);
        } else {
          alert(data.message);
        }
      });
  };
  return (
    <>
      <td>{row.username}</td>
      <td>
        <select name="paid" value={paid} onChange={handleSavePaid}>
          <option value={0}>selected</option>
          <option value={1}>โอนเงิน</option>
          <option value={2}>เงินสด</option>
        </select>
      </td>
      <td>
        {edit1 ? (
          <div style={{ display: "flex", alignItems: "end", columnGap: "5px" }}>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ fontSize: "0.9rem", width: "200px" }}
              rows={3}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
                onClick={() => {
                  setAddress("พระราม3");
                }}
              >
                พระราม3
              </button>
              <button onClick={() => setAddress("ร่มเกล้า")}>ร่มเกล้า</button>
              <button onClick={handleSetUserAddress}>ที่อยู่ลงทะเบียน</button>
            </div>
            <button type="button" onClick={handleSaveAddress}>
              save
            </button>
            <button type="button" onClick={() => setEdit1(false)}>
              cancel
            </button>
          </div>
        ) : (
          <p style={{ cursor: "pointer" }} onClick={() => setEdit1(true)}>
            {address === "" || address === null || address === undefined
              ? "-"
              : address}
          </p>
        )}
      </td>
      <td>
        <input type="checkbox" checked={ck} onChange={() => handleCheck(!ck)} />
      </td>
      <td>
        <input
          type="checkbox"
          checked={ck2}
          onChange={() => handleCheck2(!ck2)}
        />
      </td>
      <td>
        {edit ? (
          <div>
            <textarea onChange={(e) => setRemark(e.target.value)}>
              {remark}
            </textarea>
            <button onClick={handleSaveRemark}>save</button>
          </div>
        ) : (
          <p
            style={{
              cursor: "pointer",
            }}
            onClick={() => setEdit(!edit)}
          >
            {remark === null || remark === "" || remark === undefined
              ? "-"
              : remark}
          </p>
        )}
      </td>
    </>
  );
};
