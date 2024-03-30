import React, { useEffect, useState } from "react";
import { get } from "../../api/Api";

const PayrollHistory = () => {
  const [salary, setSalary] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const residents = await get.salary();
      setSalary(residents);
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <h1 className="title title_home" style={{ padding: "35px 0 20px 0" }}>
        История ЗП
      </h1>
      {salary?.map((el) => (
        <div className="attendance">
          <p className="text">
            {el.date} <br />
            <span className="text_zp">{el.status}</span>
          </p>
          <p className="text text_som">{el.summa}</p>
        </div>
      ))}
    </div>
  );
};

export default PayrollHistory;
