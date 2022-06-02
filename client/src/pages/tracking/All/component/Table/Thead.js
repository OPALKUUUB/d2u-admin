import Thead_Data from "./Thead_Data";
function Thead() {
  return (
    <thead>
      <tr>
        {Thead_Data.map((thead) => (
          <th key={thead.id} scope="col">
            {thead.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
