import React, { useState, useEffect } from "react";
import { api } from "../../api/Api";
import { IoCheckmark } from "react-icons/io5";

const HomePage = ({ Alert, users }) => {
  const [coords, setCoords] = useState({});
  const work = JSON.parse(localStorage.getItem("isWork"));
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const lat2 = coords.latitude;
      const lon2 = coords.longitude;
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/attendance/attedance/",
        { lat2, lon2 },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.data.response === true) {
        Alert("Посещение успешно принято!", "success");
        localStorage.setItem("isWork", true);
      }
    } catch (error) {
      Alert(error.message, "error");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <p className="project" style={{ padding: "30px 0 0 0" }}>
        Добро пожаловать,
      </p>
      <h1 className="title title_home">
        {users.first_name} {users.last_name}
      </h1>
      <div className="home_work">
        {work === true ? (
          <div className="work_active">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <IoCheckmark className="check_mart" />
              </div>
              <p className="check_text">Принято!</p>
            </div>
            <div
              className="wave_active"
              onClick={() => localStorage.setItem("isWork", false)}
            ></div>
          </div>
        ) : (
          <div className="work">
            <p>Я на работе</p>
            <div className="wave" onClick={handleSubmit}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
