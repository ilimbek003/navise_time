import React from "react";

const Modal = ({ modal, setModal }) => {
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
            onClick={() => localStorage.removeItem("token")}
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
