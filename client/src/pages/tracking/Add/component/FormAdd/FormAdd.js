import React, { useState } from "react";

export const FormAdd = () => {
  const [post, setPost] = useState();
  return (
    <div className="row">
      <div className="col-4">
        <label className="form-label">Date</label>
        <input className="form-control" name="date" />
      </div>
    </div>
  );
};
