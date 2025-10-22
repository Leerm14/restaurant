import React from "react";
import { Link } from "react-router-dom";
import "./Components.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const HeaderAdmin: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <img src="./src/assets/logo.svg" alt="Logo" />
          </div>
          {/* Account Button */}
          <div className="account-section">
            <Link to="/signin" className="account-button">
              <i className="fa-regular fa-circle-user"></i>
              <span>Đăng nhập</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
