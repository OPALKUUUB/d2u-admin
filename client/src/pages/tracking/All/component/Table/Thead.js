import Thead_Data from "./Thead_Data";
function Thead() {
  return (
    <thead>
      <tr>
        {Thead_Data.map((thead) => (
          <th
            key={thead.id}
            scope="col"
            style={{
              position: "sticky",
              top: 0,
              background: "white",
              zIndex: 10,
            }}
          >
            {thead.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
