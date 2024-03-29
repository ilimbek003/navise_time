import React, { useEffect } from "react";
import Authorization from "./companents/Authorization/Authorization";
import Dashboard from "./pages/Dashboard";
import { Route, Routes, useNavigate } from "react-router-dom";
const App = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="app">
      <Routes>
        <Route path="/*" element={!token ? <Authorization /> : <Dashboard />} />
        <Route
          path="/dashboard/*"
          element={!token ? <Authorization /> : <Dashboard />}
        />
      </Routes>
    </div>
  );
};

export default App;
