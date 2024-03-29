import React, { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { get } from "../../api/Api";
import { ImCancelCircle } from "react-icons/im";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const residents = await get.attedance();
      setAttendance(residents);
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <h1 className="title title_home" style={{ padding: "35px 0 20px 0" }}>
        Поcещаемость
      </h1>
      {attendance?.map((el) => (
        <div className="attendance">
          <p className="text">{el.date}</p>
          <p className="text text_date">{el.time}</p>
          {el.is_attedance === false ? (
            <p className="text_check text_red_check">
              <ImCancelCircle size={18} style={{ marginRight: "5px" }} />
              Отменено
            </p>
          ) : (
            <p className="text_check">
              <IoMdCheckmark size={18} style={{ marginRight: "5px" }} />
              Успешно
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Attendance;
