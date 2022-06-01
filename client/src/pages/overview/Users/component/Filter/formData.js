const Form_Data = [
  {
    id: 1,
    label: "Username",
    name: "username",
    type: "text",
    placeholder: "Enter Username",
  },
  {
    id: 2,
    label: "Sort",
    name: "sort",
    type: "select",
    option: [
      { id: 1, value: "asc", label: "asc" },
      { id: 2, value: "desc", label: "desc" },
    ],
  },
  { id: 3, label: "Show", name: "item", type: "number" },
];

export default Form_Data;
