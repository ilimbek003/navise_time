import React, { useState } from "react";
import { api } from "../../../api/Api";
import logo from "../../../image/Frame 676.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../../../ui/loading/Loading";
import { useNavigate } from "react-router-dom";

const Login = ({ Alert, loading, setLoading }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    phone: null,
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/login", formData);
      if (response.data.response === true) {
        setLoading(false);
        navigate("/dashboard/home");
        localStorage.setItem("token", response.data.token);
      }
      if (response.data.response === false) {
        setLoading(false);
      }
      if (response.data.message) {
        Alert(response.data.message, "error");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const formInputs = Object.keys(formData).map((key) => (
    <div key={key} style={{position: "relative"}}>
      <label className="label" htmlFor={key}>
        {key === "phone" && "Номер телефона"}
        {key === "password" && "Пароль"}
      </label>
      <input
        className="input"
        type={key === "password" && visible ? "text" : "password"}
        id={key}
        name={key}
        value={formData[key]}
        onChange={handleChange}
        placeholder={
          key === "phone" ? "Введите номер телефона" : "Введите пароль"
        }
      />
      {key === "password" && (
        <span className="span-icon" onClick={() => setVisible(!visible)}>
          {visible ? (
            <FaEye size={25} color={"#9F9F9F"} />
          ) : (
            <FaEyeSlash size={25} color={"#9F9F9F"} />
          )}
        </span>
      )}
    </div>
  ));

  return (
    <div className="container">
      <img className="logo" src={logo} alt="logo" />
      <h1 className="title">Войти</h1>
      <form onSubmit={handleSubmit}>
        {formInputs}
        <span className="span" onClick={() => navigate("/forgot-password")}>
          Забыл(-а) пароль?
        </span>
        <button className="btn" type="submit">
          {loading ? <Loading /> : "Войти"}
        </button>
        <p
          className="project"
          style={{ marginTop: "15px" }}
          onClick={() => navigate("/registration")}
        >
          Нет аккаунта?
          <span className="span span_reg">Зарегистрироваться</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
