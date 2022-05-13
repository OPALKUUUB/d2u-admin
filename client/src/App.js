import React, { useEffect } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import useToken from "./hook/useToken";
import Login from "./auth/Login";
import Sidebar from "./components/Sidebar";
import { Users } from "./pages/overview/Users";
import { Admins } from "./pages/overview/Admins";
import { Add } from "./pages/yahoo/Add";

import { Order } from "./pages/yahoo/order/Order";
import { Payment } from "./pages/yahoo/payment/Payment";
import { History } from "./pages/yahoo/history/History";
import { Tracking } from "./pages/yahoo/tracking/Tracking";

function App() {
  const { token, setToken, logout } = useToken();
  if (!token) {
    console.log("first");
    return <Login setToken={setToken} />;
  }
  return (
    <>
      <Router>
        <Sidebar />
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
            <Route path="add" element={<Add />} />
          </Route>

          <Route path="/logout" element={<Logout logout={logout} />} />
        </Routes>
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

const Logout = ({ logout }) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/");
    logout();
  });
};
export default App;
