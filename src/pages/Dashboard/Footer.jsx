import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { LuUser2 } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { PiQrCodeThin } from "react-icons/pi";
import { IoCardOutline } from "react-icons/io5";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="footer d-flex align-items-center">
        <div className="with">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <AiOutlineHome className="line_icons" />
            <p className="footer_pro">Главная</p>
          </NavLink>
        </div>
        <div className="with">
          <NavLink
            end
            to="/dashboard/attendance"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <IoCardOutline className="line_icons" />
            <p className="footer_pro">Посещаемость</p>
          </NavLink>
        </div>
        <div className="with">
          <NavLink
            end
            to="/dashboard/payroll-history"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <PiClockCounterClockwiseBold className="line_icons" />
            <p className="footer_pro">История ЗП</p>
          </NavLink>
        </div>
        <div className="with">
          <NavLink
            end
            to="/dashboard/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <LuUser2 className="line_icons" />
            <p className="footer_pro">Профиль</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Footer;
