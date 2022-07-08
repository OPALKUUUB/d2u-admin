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
import { Mercari } from "./pages/tracking/Mercari/Mercari";
import { Fril } from "./pages/tracking/Fril/Fril";
import { Web123 } from "./pages/tracking/Web123/Web123";
import { All } from "./pages/tracking/All/All";
import { Add as AddTracking } from "./pages/tracking/Add/Add";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Daiso } from "./pages/mart/Daiso/Daiso";
import { App as ShipBillingApp } from "./pages/ShipBilling/App";
import Promotion from "./pages/mart/Promotion/Promotion";
import Ewelcia from "./pages/mart/Ewelcia/Ewelcia";
import Omni7 from "./pages/mart/Omni7/Omni7";

const ContentLayout = styled.div`
  margin-left: ${(props) => (props.sidebar ? 250 : 0)}px;
  transition: all 0.2s ease-in-out;
`;
function App() {
  const { token, setToken } = useToken();
  const [sidebar, setSidebar] = useState(false);
  if (!token) {
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
              <Route path="mercari" element={<Mercari />} />
              <Route path="fril" element={<Fril />} />
              <Route path="web123" element={<Web123 />} />
              <Route path="all" element={<All />} />
              <Route path="add" element={<AddTracking />} />
            </Route>

            <Route path="/ship/billing/*" element={<ShipBillingApp />} />

            <Route path="/mart">
              <Route path="" element={<Daiso />} />
              <Route path="order" element={<Daiso />} />
              <Route path="promotion" element={<Promotion />} />
              <Route path="ewelcia" element={<Ewelcia />} />
              <Route path="omni7" element={<Omni7 />} />
            </Route>
          </Routes>
        </ContentLayout>
      </Router>
    </>
  );
}

export default App;
