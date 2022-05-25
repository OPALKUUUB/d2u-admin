import React from "react";

var months_th = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];
export const ShowDateTime = ({ date, option }) => {
  if (date === undefined || date === null || date === "") {
    return <>Date: -</>;
  }
  let t = date.split("T");
  let Date = t[0].split("-");
  let d = parseInt(Date[2]);
  let m = parseInt(Date[1]);
  let y = parseInt(Date[0]);
  let Time = t[1];
  if (option === "d") {
    return (
      <>
        {d} {months_th[m + 1]} {y + 543}
      </>
    );
  }
  if (option === "t") {
    return <>{Time}</>;
  }
  return (
    <>
      {d}/{m}/{y} ({Time})
    </>
  );
};
