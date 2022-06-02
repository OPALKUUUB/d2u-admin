import React, { useContext } from "react";
import Card from "../../../components/Card/Card";
import { UserContext, UserProvider } from "../../../context/UserProvider";
import { Filter } from "./component/Filter/Filter";
import { Table } from "./component/Table/Table";
import Pagination from "../../../components/Pagination/Pagination";

export const Users = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

function App() {
  const { filter, handleNext, handlePrevious } = useContext(UserContext);
  return (
    <div className="container-fluid mt-3">
      <Card header={true} title="Users">
        <Filter />
      </Card>
      <Card>
        <Pagination
          filter={filter}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
        <Table />
        <Pagination
          filter={filter}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </Card>
    </div>
  );
}
