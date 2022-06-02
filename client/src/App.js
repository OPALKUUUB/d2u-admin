import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import useToken from "./hook/useToken";
import Login from "./auth/Login";
import Sidebar from "./components/Sidebar";
import { Users } from "./pages/overview/Users/Users";
import { Admins } from "./pages/overview/Admins/Admins";
import { Add } from "./pages/yahoo/Add/Add";
import { Order } from "./pages/yahoo/Order/Order";
import { Payment } from "./pages/yahoo/Payment/Payment";
import { History } from "./pages/yahoo/History/History";
import { ShowHistoryItem } from "./pages/yahoo/History/ShowHistoryItem/ShowHistoryItem";
import { Tracking } from "./pages/yahoo/Tracking/Tracking";
import styled from "styled-components";
import { Shimizu } from "./pages/tracking/Shimizu/Shimizu";

const ContentLayout = styled.div`
  margin-left: ${(props) => (props.sidebar ? 250 : 0)}px;
  transition: all 0.2s ease-in-out;
`;
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
              <Route path="" element={<Order />} />
              <Route path="orders" element={<Order />} />
              <Route path="payments" element={<Payment />} />
              <Route path="trackings" element={<Tracking />} />
              <Route path="historys" element={<History />} />
              <Route path="historys/:id" element={<ShowHistoryItem />} />
              <Route path="add" element={<Add />} />
            </Route>
            <Route path="/tracking">
              <Route path="shimizu" element={<Shimizu />} />
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
