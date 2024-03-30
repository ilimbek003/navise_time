import React, { useEffect, useState } from "react";
import { get } from "../../../api/Api";
import { api } from "../../../api/Api";
import logo from "../../../image/Frame 676.svg";
import Loading from "../../../ui/loading/Loading";
import { useNavigate } from "react-router-dom";
const Registration = ({ Alert, loading, setLoading }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    type: "",
    phone: null,
    password: "",
    confirm_password: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const residents = await get.userType();
      setUser(residents);
    };
    fetchData();
  }, []);

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
      const response = await api.post("/register/", formData);
      if (response.data.response === true) {
        navigate("/confirmation-code");
        Alert(response.data.message, "success");
        localStorage.setItem("phone", formData.phone);
        localStorage.setItem("first_name", formData.first_name);
        localStorage.setItem("last_name", formData.last_name);
        setLoading(false);
      }
      if (response.data.response === false) {
        setLoading(false);
        Alert(response.data.message, "error");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const formInputs = Object.keys(formData).map((key) => (
    <div key={key}>
      <label className="label" htmlFor={key}>
        {key === "first_name" && "Имя"}
        {key === "last_name" && "Фамилия"}
        {key === "type" && "Должность"}
        {key === "phone" && "Номер телефона"}
        {key === "password" && "Пароль"}
        {key === "confirm_password" && "Повторите пароль"}
      </label>
      {key === "type" ? (
        <select
          id={key}
          name={key}
          className="input"
          value={formData[key]}
          onChange={handleChange}
        >
          <option value="">Выберите должность</option>
          {user?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="input"
          type="text"
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          placeholder={
            key === "first_name"
              ? "Введите ваше имя"
              : key === "last_name"
              ? "Введите вашу фамилию"
              : key === "phone"
              ? "Введите номер телефона"
              : key === "password"
              ? "Введите пароль"
              : key === "confirm_password"
              ? "Повторите пароль"
              : ""
          }
        />
      )}
    </div>
  ));

  return (
    <div className="container">
      <img className="logo" src={logo} alt="logo" />
      <h1 className="title">Регистрация</h1>
      <form onSubmit={handleSubmit}>
        {formInputs}
        <button className="btn" type="submit">
          {loading ? <Loading /> : "Зарегистрироваться"}
        </button>
        <p
          className="project"
          style={{ marginTop: "15px" }}
          onClick={() => navigate("/")}
        >
          Уже есть аккаунт?
          <span className="span span_reg">Войти</span>
        </p>
      </form>
    </div>
  );
};

export default Registration;
