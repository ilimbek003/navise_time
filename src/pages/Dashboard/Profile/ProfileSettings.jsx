import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { api, get } from "../../../api/Api";
import ProfileImg from "./ProfileImg";
import SettingInput from "./SettingInput";

const ProfileSettings = ({ users, Alert, setLoading, loading, fetchData }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    type: "",
    phone: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      const residents = await get.userType();
      setUser(residents);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (users) {
      setFormData({
        ...formData,
        first_name: users.first_name || "",
        last_name: users.last_name || "",
        type: users.type || "",
        phone: users.phone || "",
      });
    }
  }, [users]);

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
      const token = localStorage.getItem("token");
      const response = await api.patch("/user/info", formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.data.response === true) {
        Alert("Данные успешно обновлены!", "success");
        setLoading(false);
        fetchData();
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
      </label>
      {key === "type" ? (
        <select
          id={key}
          name={key}
          className="input"
          value={formData[key]}
          onChange={handleChange}
        >
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
        />
      )}
    </div>
  ));
  return (
    <div className="container">
      <div className="flex_box" style={{ padding: "35px 0 0 0" }}>
        <IoIosArrowBack
          onClick={() => navigate("/dashboard/profile")}
          className="back"
          style={{ margin: "0" }}
          size={30}
        />
        <h1
          style={{ whiteSpace: "nowrap", width: "33%", fontSize: "20px" }}
          className="title title_home"
        >
          Настройки профиля
        </h1>
        <div style={{ width: "33%" }} />
      </div>
      <ProfileImg Alert={Alert} users={users} fetchData={fetchData} />
      <SettingInput
        loading={loading}
        formInputs={formInputs}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProfileSettings;
