import React, { useState, useEffect } from "react";
import { api } from "../../api/Api";

const HomePage = ({ Alert, users }) => {
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const [isWaveActive, setIsWaveActive] = useState(false);
  const [coords, setCoords] = useState({});

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

  const handleWorkClick = () => {
    setIsWaveActive(true);
    setTimeout(() => {
      setIsWaveActive(false);
    }, 1000);
  };
  const lat1 = 42.880204;
  const lon1 = 74.588213;
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.response === true) {
        Alert("Посещение успешно принято!", "success");
        localStorage.setItem("isWork", setIsWaveActive(true));
      }
      if (response.data.response === false) {
        Alert(response.data.message, "error");
      }
    } catch (error) {
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
        <div className="work">
          <p>Я на работе</p>
          <div className="wave" onClick={handleSubmit}></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
