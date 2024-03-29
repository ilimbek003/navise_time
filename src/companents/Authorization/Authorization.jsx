import React, { useEffect, useState } from "react";
import Registration from "./Registration/Registration";
import { AlertData } from "../../ui/alert/Alert";
import ConfirmTheCode from "./Registration/ConfirmTheCode";
import Login from "./Registration/Login";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./Registration/ForgotPassword";

const Authorization = () => {
  const [openAlert, setOpenAlert] = useState({
    open: false,
    props: "",
    text: "",
  });
  const [loading, setLoading] = useState(false);
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
    if (openAlert.open) {
      const timeoutId = setTimeout(() => {
        setOpenAlert({ ...openAlert, open: false });
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [openAlert.open]);

  useEffect(() => {
    setInterval(function () {
      if (!navigator.onLine || window.addEventListener("offline", null)) {
        FuncAlert("Отсутствует подключение к интернету", "error");
      }
    }, 3000);
  }, []);
  return (
    <div>
      <div>
        {openAlert.open && (
          <AlertData
            state={openAlert}
            setState={setOpenAlert}
            propsData={openAlert.props}
            text={openAlert.text}
          />
        )}
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              Alert={FuncAlert}
              setLoading={setLoading}
              loading={loading}
            />
          }
        />
        <Route
          path="/registration"
          element={
            <Registration
              Alert={FuncAlert}
              setLoading={setLoading}
              loading={loading}
            />
          }
        />
        <Route
          path="/confirmation-code"
          element={
            <ConfirmTheCode
              Alert={FuncAlert}
              setLoading={setLoading}
              loading={loading}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ForgotPassword
              Alert={FuncAlert}
              setLoading={setLoading}
              loading={loading}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Authorization;
