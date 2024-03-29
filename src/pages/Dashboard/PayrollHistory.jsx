import React from "react";

const PayrollHistory = () => {
  return (
    <div className="container">
      <h1 className="title title_home" style={{ padding: "35px 0 20px 0" }}>
        История ЗП
      </h1>
      <div className="attendance">
        <p className="text">
          22.03.2024 <br />
          <span className="text_zp">ЗП</span>
        </p>
        <p className="text text_som">40 000 сом</p>
      </div>
    </div>
  );
};

export default PayrollHistory;
