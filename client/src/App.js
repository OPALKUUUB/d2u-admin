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
import { Orders } from "./pages/yahoo/Orders";
import { Payments } from "./pages/yahoo/Payments";
import { Historys } from "./pages/yahoo/Historys";
import { Add } from "./pages/yahoo/Add";

function App() {
  const { token, setToken, logout } = useToken();
  if (!token) {
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
            <Route path="" element={<Orders />} />
            <Route path="orders" element={<Orders />} />
            <Route path="payments" element={<Payments />} />
            <Route path="Historys" element={<Historys />} />
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
