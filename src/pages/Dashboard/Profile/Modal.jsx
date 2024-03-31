import React from "react";
import { useNavigate } from "react-router-dom";

export const Modal = ({ modal, setModal }) => {
  const navigate = useNavigate();
  return (
    <div className="modal" onClick={() => setModal(false)}>
      <div className="modal_div">
        <h1 className="title title_home">Выйти с аккаунта?</h1>
        <p className="project" style={{ padding: "20px 0 5px 0" }}>
          Вы сможете в любое время снова войти в свой аккаунт
        </p>
        <div className="buttons">
          <button className="cancel" onClick={() => setModal(false)}>
            Отмена
          </button>
          <button
            className="confirm"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModalTwo = ({ modal, setModal }) => {
  const navigator = useNavigate();
  return (
    <div className="modal" onClick={() => setModal(false)}>
      <div className="modal_div">
        <h1 className="title title_home">Выйти с аккаунта?</h1>
        <p className="project" style={{ padding: "20px 0 5px 0" }}>
          После удаления аккаунта ваши данные не будут подлежать восстановлению
        </p>
        <div className="buttons">
          <button className="cancel" onClick={() => setModal(false)}>
            Отмена
          </button>
          <button
            className="confirm"
            onClick={() => {
              localStorage.removeItem("token");
              navigator("/");
            }}
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};
