import React from "react";
import "./Components.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <img src="./src/assets/logo.svg" alt="Logo" />
          </div>

          {/* Navigation Menu */}
          <nav className="nav-menu">
            <a href="#menu" className="nav-link">
              Menu
            </a>
            <a href="#reservation" className="nav-link">
              Đặt bàn
            </a>
            <a href="#orders" className="nav-link">
              Lịch sử đơn hàng
            </a>
            <a href="#info" className="nav-link">
              Thông tin cá nhân
            </a>
          </nav>

          {/* Account Button */}
          <div className="account-section">
            <button className="account-button">
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>Tài khoản</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
