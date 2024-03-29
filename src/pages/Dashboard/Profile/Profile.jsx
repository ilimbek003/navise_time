import React from "react";
import profile from "../../../image/Frame 666.svg";
import { IoPersonOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [modal, setModal] = React.useState(false);
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  return (
    <>
      <div className="profile">
        <div className="container">
          <h1
            className="title title_home"
            style={{
              padding: "35px 0 20px 0",
              color: "rgba(255, 255, 255, 1)",
            }}
          >
            Профиль
          </h1>
          <div className="profile_div">
            <img src={profile} className="img" alt="" />
            <p className="name">
              {first_name} {last_name}
            </p>
            <p className="job">UX-UI Дизайнер</p>
          </div>
          <div className="monthly">
            <p className="project" style={{ padding: "0 0 5px 0" }}>
              Ежемесячная зарплата:
            </p>
            <h1 className="title title_home">100 000 сом</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div style={{ marginTop: "90px" }}>
          <div
            className="settings_profile"
            onClick={() => navigate("/dashboard/profile-settings")}
          >
            <p className="setting_text">
              <IoPersonOutline
                size={26}
                color="red"
                style={{ marginRight: "20px" }}
              />
              Настройки профиля
            </p>
            <MdArrowForwardIos />
          </div>
          <div className="settings_profile" onClick={() => setModal(true)}>
            <p className="setting_text">
              <MdLogout size={26} color="red" style={{ marginRight: "20px" }} />
              Выйти с аккаунта
            </p>
            <MdArrowForwardIos />
          </div>
          {modal && <Modal setModal={setModal} modal={modal} />}
        </div>
      </div>
    </>
  );
};

export default Profile;
