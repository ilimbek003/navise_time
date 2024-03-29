import React, { useState } from "react";
import { api } from "../../../api/Api";
import Loading from "../../../ui/loading/Loading";
import OtpInput from "react-otp-input";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const ConfirmTheCode = ({ Alert, loading, setLoading }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const phone = localStorage.getItem("phone");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/verify/phone/", { phone, code });
      if (response.data.response === true) {
        Alert(response.data.message, "success");
        navigate("/dashboard/home");
        localStorage.setItem("token", response.data.token);
        setLoading(false);
      }
      if (response.data.response === false) {
        Alert(response.data.message, "error");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <div className="container">
      <IoIosArrowBack
        onClick={() => navigate("/registration")}
        className="back"
        size={30}
      />
      <div>
        <h1 className="title cofirm_title"> Потвердите код</h1>
        <p className="project">Мы отправили код на ваш номер телефона</p>
        <form className="otp_form" onSubmit={handleSubmit} autoComplete="off">
          <OtpInput
            type="number"
            value={code}
            onChange={setCode}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            className="otp_input"
          />
          <button className="btn">
            {loading ? <Loading /> : "Потвердить код"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmTheCode;
