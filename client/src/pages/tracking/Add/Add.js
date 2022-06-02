import React from "react";
import Card from "../../../components/Card/Card";
import { AllTrackingProvider } from "../../../context/AllTrackingProvider";
import { FormAdd } from "./component/FormAdd/FormAdd";

export const Add = () => {
  return (
    <AllTrackingProvider>
      <App />
    </AllTrackingProvider>
  );
};

function App() {
  return (
    <div className="container-fluid mt-3">
      <Card header={true} title="+Add">
        <FormAdd />
      </Card>
    </div>
  );
}
