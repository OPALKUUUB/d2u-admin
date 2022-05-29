import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import useToken from "./hook/useToken";
import Login from "./auth/Login";
import Sidebar from "./components/Sidebar";
import { Users } from "./pages/overview/Users/Users";
import { Admins } from "./pages/overview/Admins/Admins";
import { Add } from "./pages/yahoo/Add/Add";
import { Add as AddTracking } from "./pages/tracking/Add/Add";
import { Order } from "./pages/yahoo/Order/Order";
import { Payment } from "./pages/yahoo/Payment/Payment";
import { History } from "./pages/yahoo/History/History";
import { ShowHistoryItem } from "./pages/yahoo/History/ShowHistoryItem/ShowHistoryItem";
import { Tracking } from "./pages/yahoo/Tracking/Tracking";
import { ContentLayout } from "./pages/yahoo/Order/components/ContentLayout";
import { All } from "./pages/tracking/All/All";
import { Shimizu } from "./pages/tracking/Shimizu/Shimizu";
import { Mercari } from "./pages/tracking/Mercari/Mercari";
import { Fril } from "./pages/tracking/Fril/Fril";
import { Web123 } from "./pages/tracking/Web123/Web123";
import { AllItem } from "./pages/tracking/All/AllItem/AllItem";
import { Edit as ShimizuEdit } from "./pages/tracking/Shimizu/Edit/Edit";
import { Edit as MercariEdit } from "./pages/tracking/Mercari/Edit/Edit";

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
              <Route path="" element={<All />} />
              <Route path="all" element={<All />} />
              <Route path="all/:id" element={<AllItem />} />
              <Route path="shimizu" element={<Shimizu />} />
              <Route path="mercari" element={<Mercari />} />
              <Route path="fril" element={<Fril />} />
              <Route path="web123" element={<Web123 />} />
              <Route path="add" element={<AddTracking />} />

              <Route path="shimizu/edit/:id" element={<ShimizuEdit />} />
              <Route path="mer123fril/edit/:id" element={<MercariEdit />} />
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
