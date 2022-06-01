const Win_Data = [
  {
    id: 1,
    label: "Bid (yen.)",
    name: "bid",
    type: "number",
    col: "col-6",
    placeholder: "Enter Bid",
  },
  {
    id: 2,
    label: "Tranfer Fee (bath.)",
    name: "tranfer_fee_injapan",
    type: "number",
    col: "col-6",
    placeholder: "Enter Bid",
  },
  {
    id: 3,
    label: "Delivery Fee (yen.)",
    name: "delivery_in_thai",
    type: "number",
    col: "col-6",
    placeholder: "Enter Bid",
  },
  {
    id: 4,
    label: "Payment Status",
    name: "payment_status",
    type: "select",
    col: "col-6",
    option: [
      { id: 3, value: null, label: "select" },
      { id: 1, value: "pending1", label: "รอค่าส่ง&ค่าโวอน" },
      { id: 2, value: "pending2", label: "รอการชำระ" },
    ],
  },
  {
    id: 5,
    label: "Admin Noted",
    name: "noted",
    type: "text",
    col: "col-12",
    placeholder: "Enter Noted",
  },
];
export default Win_Data;
