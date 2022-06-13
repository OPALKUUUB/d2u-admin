import { useContext } from "react";
import { AllTrackingContext } from "../../../../../context/AllTrackingProvider";
import Thead_Data from "./Thead_Data";
function Thead() {
  const { filter, handleClickSort } = useContext(AllTrackingContext);
  return (
    <thead>
      <tr>
        {Thead_Data.map((thead) => {
          if (thead.id === 2) {
            return (
              <th
                key={thead.id}
                scope="col"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  let sort = filter.sort === "1" ? 2 : 1;
                  handleClickSort(sort);
                }}
              >
                {thead.title} ({filter.sort === 1 ? "up" : "down"})
              </th>
            );
          } else if (thead.id === 6) {
            return (
              <th
                key={thead.id}
                scope="col"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  let sort = filter.sort === "3" ? 4 : 3;
                  handleClickSort(sort);
                }}
              >
                {thead.title} ({filter.sort === 3 ? "up" : "down"})
              </th>
            );
          }
          return (
            <th key={thead.id} scope="col">
              {thead.title}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default Thead;
