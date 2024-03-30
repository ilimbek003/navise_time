import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Password from "./Password";

const Change = ({ Alert }) => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="flex_box" style={{ padding: "35px 0 0 0" }}>
        <IoIosArrowBack
          onClick={() => navigate("/dashboard/profile-settings")}
          className="back"
          style={{ margin: "0" }}
          size={30}
        />
        <h1
          style={{ whiteSpace: "nowrap", width: "20%", fontSize: "20px" }}
          className="title title_home"
        >
          Сменить пароль
        </h1>
        <div style={{ width: "33%" }} />
      </div>
      <Password Alert={Alert} />
    </div>
  );
};

export default Change;
