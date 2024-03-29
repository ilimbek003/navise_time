import React from "react";
import HomePage from "./Dashboard/HomePage";
import { Route, Routes } from "react-router-dom";
import Footer from "./Dashboard/Footer";
import Attendance from "./Dashboard/Attendance";
import PayrollHistory from "./Dashboard/PayrollHistory";
import Profile from "./Dashboard/Profile/Profile";
import ProfileSettings from "./Dashboard/Profile/ProfileSettings";

const Dashboard = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/payroll-history" element={<PayrollHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Dashboard;
