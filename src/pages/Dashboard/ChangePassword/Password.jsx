import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "../../../api/Api";
import Loading from "../../../ui/loading/Loading";

const Password = ({ Alert }) => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/password/change", password, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.data.response === true) {
        Alert(response.data.message, "success");
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
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
        <div className="form-group">
          <label className="label">Старый пароль</label>
          <input
            className="input"
            type={visible ? "text" : "password"}
            name="old_password"
            value={password.old_password}
            onChange={handleChange}
          />
          <span className="span-icon" onClick={() => setVisible(!visible)}>
            {visible ? (
              <FaEye size={25} color={"#9F9F9F"} />
            ) : (
              <FaEyeSlash size={25} color={"#9F9F9F"} />
            )}
          </span>
        </div>
        <div className="form-group">
          <label className="label">Новый пароль</label>
          <input
            className="input"
            type={visible1 ? "text" : "password"}
            name="password"
            value={password.password}
            onChange={handleChange}
          />
          <span className="span-icon" onClick={() => setVisible1(!visible1)}>
            {visible1 ? (
              <FaEye size={25} color={"#9F9F9F"} />
            ) : (
              <FaEyeSlash size={25} color={"#9F9F9F"} />
            )}
          </span>
        </div>
        <div className="form-group">
          <label className="label">Повторите новый пароль</label>
          <input
            className="input"
            type={visible2 ? "text" : "password"}
            name="confirm_password"
            value={password.confirm_password}
            onChange={handleChange}
          />
          <span className="span-icon" onClick={() => setVisible2(!visible2)}>
            {visible2 ? (
              <FaEye size={25} color={"#9F9F9F"} />
            ) : (
              <FaEyeSlash size={25} color={"#9F9F9F"} />
            )}
          </span>
        </div>
        <button className="btn" type="submit">
          {loading ? <Loading /> : "Сохранить изменения"}
        </button>
      </form>
    </div>
  );
};

export default Password;
