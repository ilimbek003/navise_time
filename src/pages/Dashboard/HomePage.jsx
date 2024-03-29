import React from "react";

const HomePage = () => {
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  return (
    <div className="container">
      <p className="project" style={{ padding: "30px 0 0 0" }}>
        Добро пожаловать,
      </p>
      <h1 className="title title_home">
        {first_name} {last_name}
      </h1>
    </div>
  );
};

export default HomePage;
