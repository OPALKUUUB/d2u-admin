import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import useToken from "./hook/useToken";
import Login from "./auth/Login";
import Sidebar from "./components/Sidebar";
import { Users } from "./pages/overview/Users";
import { Admins } from "./pages/overview/Admins";
import { Add } from "./pages/yahoo/Add";

import { Order } from "./pages/yahoo/Order/Order";
import { Payment } from "./pages/yahoo/Payment/Payment";
import { History } from "./pages/yahoo/History/History";
import { Tracking } from "./pages/yahoo/Tracking/Tracking";
import { ContentLayout } from "./pages/yahoo/Order/components/ContentLayout";
import { ShowItem } from "./pages/yahoo/History/components/ShowItem/index";

function App() {
  const { token, setToken } = useToken();
  const [sidebar, setSidebar] = useState(false);
  if (!token) {
    console.log("first");
    return <Login setToken={setToken} />;
  }
  return (
    <>
      <Router>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <ContentLayout sidebar={sidebar}>
          <Routes>
            <Route index path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/overview">
              <Route path="" element={<Users />} />
              <Route path="users" element={<Users />} />
              <Route path="admins" element={<Admins />} />
            </Route>

            <Route path="/yahoo">
              {/* <Route path="" element={<Orders />} />
            <Route path="orders" element={<Orders />} /> */}
              <Route path="" element={<Order />} />
              <Route path="orders" element={<Order />} />
              <Route path="payments" element={<Payment />} />
              <Route path="trackings" element={<Tracking />} />
              <Route path="historys" element={<History />} />
              <Route path="historys/:id" element={<ShowItem />} />
              <Route path="add" element={<Add />} />
            </Route>
          </Routes>
        </ContentLayout>
      </Router>
    </>
  );
}

const Dashboard = () => {
  return (
    <div className="test">
      <h1>Dashboard</h1>
    </div>
  );
};

export default App;
