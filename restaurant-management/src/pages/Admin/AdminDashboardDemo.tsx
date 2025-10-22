import React, { useState } from "react";
import AdminLayout from "../../layouts/Adminlayout";
import AdminMenuManagement from "./AdminMenuManagement";

const AdminDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("accounts");

  const handleMenuSelect = (menu: string) => {
    setActiveMenu(menu);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "accounts":
        return (
          <div className="admin-content-card">
            <h1>
              <i className="fas fa-user-cog"></i> Quản lý tài khoản
            </h1>
            <p>Nội dung quản lý tài khoản của hệ thống nhà hàng.</p>

            <div className="admin-content-card">
              <h2>Danh sách tài khoản</h2>
              <p>• Quản lý nhân viên</p>
              <p>• Quản lý khách hàng</p>
              <p>• Phân quyền người dùng</p>
              <p>• Lịch sử hoạt động</p>
            </div>
          </div>
        );
      case "menu":
        return <AdminMenuManagement />;
      case "tables":
        return (
          <div className="admin-content-card">
            <h1>
              <i className="fas fa-table"></i> Quản lý bàn
            </h1>
            <p>Quản lý bàn ăn và đặt chỗ của nhà hàng.</p>

            <div className="admin-content-card">
              <h2>Chức năng quản lý bàn</h2>
              <p>• Sơ đồ bàn ăn</p>
              <p>• Đặt bàn trước</p>
              <p>• Trạng thái bàn</p>
              <p>• Lịch sử sử dụng</p>
            </div>
          </div>
        );
      case "reports":
        return (
          <div className="admin-content-card">
            <h1>
              <i className="fas fa-chart-line"></i> Thống kê & Báo cáo
            </h1>
            <p>Xem báo cáo doanh thu và thống kê hoạt động nhà hàng.</p>

            <div className="admin-content-card">
              <h2>Các loại báo cáo</h2>
              <p>• Báo cáo doanh thu</p>
              <p>• Thống kê món ăn bán chạy</p>
              <p>• Báo cáo khách hàng</p>
              <p>• Phân tích xu hướng</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="admin-content-card">
            <h1>
              <i className="fas fa-cog"></i> Cài đặt hệ thống
            </h1>
            <p>Cấu hình và thiết lập hệ thống nhà hàng.</p>

            <div className="admin-content-card">
              <h2>Cài đặt chung</h2>
              <p>• Thông tin nhà hàng</p>
              <p>• Cấu hình thanh toán</p>
              <p>• Thiết lập email</p>
              <p>• Backup & Restore</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="admin-content-card">
            <h1>
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </h1>
            <p>Chào mừng đến với trang quản trị hệ thống nhà hàng!</p>

            <div className="admin-content-card">
              <h2>Tổng quan hệ thống</h2>
              <p>
                Sử dụng menu bên trái để điều hướng đến các chức năng quản lý.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <AdminLayout activeMenu={activeMenu} onMenuSelect={handleMenuSelect}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;
