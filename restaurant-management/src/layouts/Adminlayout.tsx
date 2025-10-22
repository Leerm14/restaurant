import React, { useState, ReactNode } from "react";
import Headeradmin from "../components/Headeradmin";
import Navadmin from "../components/Navadmin";
import "./Adminlayout.css";

interface AdminLayoutProps {
  children: ReactNode;
  activeMenu?: string;
  onMenuSelect?: (menu: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeMenu = "accounts",
  onMenuSelect,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(activeMenu);

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    if (onMenuSelect) {
      onMenuSelect(menu);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-layout">
      {/* Header Admin */}
      <div className="admin-header-wrapper">
        <Headeradmin />
      </div>

      {/* Main Content Area */}
      <div className="admin-main-wrapper">
        {/* Navigation Sidebar */}
        <div className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <Navadmin onMenuSelect={handleMenuSelect} activeMenu={selectedMenu} />
        </div>

        {/* Content Area */}
        <div
          className={`admin-content-area ${
            isSidebarOpen ? "with-sidebar" : "full-width"
          }`}
        >
          {/* Toggle Sidebar Button */}
          <button
            className="sidebar-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <i
              className={`fas ${
                isSidebarOpen ? "fa-chevron-left" : "fa-chevron-right"
              }`}
            ></i>
          </button>

          {/* Page Content */}
          <div className="admin-page-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
