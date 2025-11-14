import React from "react";
import { Link } from "react-router-dom";
import "./Components.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const HeaderAdmin: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo">
            <img src="./src/assets/logo.svg" alt="Logo" />
          </div>
          <div className="account-section">
            <div className="account-button">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Đăng xuất</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
