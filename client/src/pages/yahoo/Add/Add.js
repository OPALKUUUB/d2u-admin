import React from "react";
import Card from "../../../components/Card/Card";
import { AddYahooProvider } from "../../../context/AddYahooProvider";
import { FormAdd } from "./component/FormAdd/FormAdd";

export const Add = () => {
  return (
    <AddYahooProvider>
      <App />
    </AddYahooProvider>
  );
};

const App = () => {
  return (
    <div className="container-fluid mt-3">
      <Card header={true} title="Yahoo / Add">
        <FormAdd />
      </Card>
    </div>
  );
};
