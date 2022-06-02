const Form_Data = [
  {
    id: 1,
    label: "Username",
    name: "username",
    type: "text",
    col: "col-sm-12 col-md-3",
    placeholder: "Enter Username",
  },
  {
    id: 2,
    label: "Sort",
    name: "sort",
    type: "select",
    col: "col-sm-12 col-md-3",
    option: [
      { id: 1, value: "asc", label: "asc" },
      { id: 2, value: "desc", label: "desc" },
    ],
  },
  {
    id: 3,
    label: "Show",
    name: "item",
    type: "number",
    col: "col-sm-12 col-md-3",
  },
];

export default Form_Data;
