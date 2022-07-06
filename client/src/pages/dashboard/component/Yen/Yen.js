import React, { useState } from "react";
import "./Yen.css";
import * as HiIcons from "react-icons/hi";

export const Yen = ({ rate, patch }) => {
  const [value, setValue] = useState(rate);
  const [edit, setEdit] = useState(false);
  const handleSave = () => {
    let yen = value;
    const obj = {
      yen: yen,
    };
    patch(obj);
    setEdit(false);
  };
  return (
    <div className="Yen">
      <div className="box left">
        <HiIcons.HiCurrencyYen className="icon" />
        <div className="name">Rate 1 Yen</div>
      </div>
      <div className="box right">
        {!edit ? (
          <div className="value" onClick={() => setEdit(true)}>
            {rate.toFixed(2)} Bath
          </div>
        ) : (
          <div className="edit-value">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
};
