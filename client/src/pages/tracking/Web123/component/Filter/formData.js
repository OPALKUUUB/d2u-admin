const Form_Data = [
  {
    id: 1,
    label: "Date",
    name: "date",
    type: "date",
    col: "col-sm-12 col-md-2",
  },
  {
    id: 2,
    label: "Username",
    name: "username",
    type: "text",
    col: "col-sm-12 col-md-2",
    placeholder: "Enter Username",
  },
  {
    id: 3,
    label: "Track Id",
    name: "track_id",
    type: "text",
    col: "col-sm-12 col-md-2",
    placeholder: "Enter Track Id",
  },
  {
    id: 4,
    label: "Voyage",
    name: "round_boat",
    type: "date",
    col: "col-sm-12 col-md-2",
  },
  {
    id: 6,
    label: "Done",
    name: "check2",
    type: "select",
    col: "col-sm-12 col-md-1 mb-3",
    option: [
      { id: 3, value: "all", label: "all" },
      { id: 1, value: "1", label: "done" },
      { id: 2, value: "0", label: "not done" },
    ],
  },
  {
    id: 8,
    label: "Show",
    name: "item",
    type: "number",
    col: "col-sm-12 col-md-1",
  },
];

export default Form_Data;
