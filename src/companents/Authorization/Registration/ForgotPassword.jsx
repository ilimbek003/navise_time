import React, { useState } from "react";
import { api } from "../../../api/Api";
import Loading from "../../../ui/loading/Loading";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const ForgotPassword = ({ Alert, loading, setLoading }) => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/password/forgot", { phone });
      if (response.data.response === true) {
        navigate("/confirmation-code");
        Alert(response.data.message, "success");
      }
      if (response.data.response === true) {
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
    <div className="container">
      <IoIosArrowBack
        onClick={() => navigate("/")}
        className="back"
        size={30}
      />
      <div>
        <h1 className="title cofirm_title">Забыл(-а) пароль</h1>
        <p className="project"> Мы отправим код на ваш номер телефона</p>
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: "20px" }}
          autoComplete="off"
        >
          <div>
            <label className="label">Номер телефона</label>
            <input
              className="input"
              type="number"
              name={phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button className="btn">
            {loading ? <Loading /> : "Получить код"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
