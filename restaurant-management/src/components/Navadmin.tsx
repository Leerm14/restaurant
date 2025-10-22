import React, { useState } from "react";
import "./Components.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface NavAdminProps {
  onMenuSelect?: (menu: string) => void;
  activeMenu?: string;
}

const Navadmin: React.FC<NavAdminProps> = ({
  onMenuSelect,
  activeMenu = "accounts",
}) => {
  const [selectedMenu, setSelectedMenu] = useState(activeMenu);

  const menuItems = [
    {
      id: "accounts",
      label: "Quản lý tài khoản",
      icon: "fas fa-user-cog",
    },
    {
      id: "menu",
      label: "Quản lý menu",
      icon: "fas fa-utensils",
    },
    {
      id: "tables",
      label: "Quản lý bàn",
      icon: "fas fa-table",
    },
    {
      id: "reports",
      label: "Thống kê & Báo cáo",
      icon: "fas fa-chart-line",
    },
    {
      id: "settings",
      label: "Cài đặt hệ thống",
      icon: "fas fa-cog",
    },
  ];

  const handleMenuClick = (menuId: string) => {
    setSelectedMenu(menuId);
    if (onMenuSelect) {
      onMenuSelect(menuId);
    }
  };

  return (
    <nav className="nav-admin">
      <div className="nav-admin-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="nav-admin-menu">
        {menuItems.map((item) => (
          <li key={item.id} className="nav-admin-item">
            <button
              className={`nav-admin-button ${
                selectedMenu === item.id ? "active" : ""
              }`}
              onClick={() => handleMenuClick(item.id)}
            >
              <i className={`nav-admin-icon ${item.icon}`}></i>
              <span className="nav-admin-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navadmin;
