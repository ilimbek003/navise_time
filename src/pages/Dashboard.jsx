import React, { useEffect, useState } from "react";
import HomePage from "./Dashboard/HomePage";
import { Route, Routes } from "react-router-dom";
import Footer from "./Dashboard/Footer";
import Attendance from "./Dashboard/Attendance";
import PayrollHistory from "./Dashboard/PayrollHistory";
import Profile from "./Dashboard/Profile/Profile";
import ProfileSettings from "./Dashboard/Profile/ProfileSettings";
import { AlertData } from "../ui/alert/Alert";
import { api } from "../api/Api"; // Assuming 'get' is not used
import Change from "./Dashboard/ChangePassword/Change";

const Dashboard = () => {
  const [openAlert, setOpenAlert] = useState({
    open: false,
    props: "",
    text: "",
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const residents = await api.get("/user/info", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUser(residents.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  function FuncAlert(text, props) {
    setTimeout(() => {
      setOpenAlert({
        ...openAlert,
        open: true,
        text: text,
        props: props,
      });
    }, 200);
    setOpenAlert({ ...openAlert, open: false });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (openAlert.open) {
      const timeoutId = setTimeout(() => {
        setOpenAlert({ ...openAlert, open: false });
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [openAlert.open]);

  return (
    <div>
      {openAlert.open && (
        <AlertData
          state={openAlert}
          setState={setOpenAlert}
          propsData={openAlert.props}
          text={openAlert.text}
        />
      )}
      <Routes>
        <Route
          path="/home"
          element={<HomePage Alert={FuncAlert} users={user} />}
        />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/payroll-history" element={<PayrollHistory />} />
        <Route path="/profile" element={<Profile users={user} />} />
        <Route
          path="/profile-settings"
          element={
            <ProfileSettings
              Alert={FuncAlert}
              setLoading={setLoading}
              loading={loading}
              users={user}
              fetchData={fetchData}
            />
          }
        />
        <Route path="/change-password" element={<Change Alert={FuncAlert} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Dashboard;
