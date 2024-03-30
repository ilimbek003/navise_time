import React, { useState } from "react";
import Loading from "../../../ui/loading/Loading";
import { useNavigate } from "react-router-dom";
import {  ModalTwo } from "./Modal";

const SettingInput = ({ formInputs, handleSubmit, loading }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
        {formInputs}
      </form>
      <p
        className="password_text"
        onClick={() => navigate("/dashboard/change-password")}
      >
        Сменить пароль
      </p>
      <br />
      <p
        className="password_text top_text"
        style={{ margin: "5px 0 10px 0" }}
        onClick={() => setModal(true)}
      >
        Удалить аккаунт
      </p>
      <button className="btn" type="submit" onClick={handleSubmit}>
        {loading ? <Loading /> : "Сохранить изменения"}
      </button>
      {modal && <ModalTwo setModal={setModal} modal={modal} />}
    </div>
  );
};

export default SettingInput;
