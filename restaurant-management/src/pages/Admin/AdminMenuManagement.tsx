import React, { useState, useEffect, useRef } from "react";
import "./AdminMenuManagement.css";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  status: "available" | "unavailable";
  image: string;
  description?: string;
}

const AdminMenuManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mock data - giống với hình ảnh
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Phở Bò Đặc Biệt",
      price: 85000,
      category: "Mon chinh",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
      description: "Phở bò truyền thống với thịt bò tươi ngon",
    },
    {
      id: "2",
      name: "Gỏi Cuốn Tôm Thịt",
      price: 60000,
      category: "Mon chinh",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
      description: "Gỏi cuốn tôm thịt tươi ngon",
    },
    {
      id: "3",
      name: "Bún Chả Hà Nội",
      price: 75000,
      category: "Mon chinh",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1569997387917-3b951c85b555?w=400&h=300&fit=crop",
      description: "Bún chả Hà Nội đặc trưng",
    },
    {
      id: "4",
      name: "Cà Phê Sữa Đá",
      price: 45000,
      category: "Do uong",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
      description: "Cà phê sữa đá truyền thống",
    },
    {
      id: "5",
      name: "Chè Khúc Bach",
      price: 50000,
      category: "Trang mieng",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
      description: "Chè khúc bach mát lạnh",
    },
    {
      id: "6",
      name: "Nem Lại Huế",
      price: 65000,
      category: "Mon chinh",
      status: "unavailable",
      image:
        "https://images.unsplash.com/photo-1559847844-d72ee8d6a1d4?w=400&h=300&fit=crop",
      description: "Nem lại Huế thơm ngon",
    },
    {
      id: "7",
      name: "Lẩu Thái Chua Cay",
      price: 250000,
      category: "Mon chinh",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1569997387976-d8c4b8264e65?w=400&h=300&fit=crop",
      description: "Lẩu Thái chua cay cho 2-3 người",
    },
    {
      id: "8",
      name: "Nước Cam Ép",
      price: 35000,
      category: "Do uong",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
      description: "Nước cam tươi ép",
    },
    {
      id: "9",
      name: "Bánh Mì Kẹp",
      price: 30000,
      category: "Mon chinh",
      status: "unavailable",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      description: "Bánh mì kẹp thịt nướng",
    },
    {
      id: "10",
      name: "Sinh Tố Bơ",
      price: 40000,
      category: "Do uong",
      status: "unavailable",
      image:
        "https://images.unsplash.com/photo-1553530979-172d77df7f89?w=400&h=300&fit=crop",
      description: "Sinh tố bơ sữa đặc",
    },
  ]);

  const categories = [
    { id: "all", name: "Tất cả danh mục", color: "gray" },
    { id: "Mon chinh", name: "Món chính", color: "green" },
    { id: "Do uong", name: "Đồ uống", color: "blue" },
    { id: "Trang mieng", name: "Tráng miệng", color: "purple" },
  ];

  const statusFilters = [
    { id: "all", name: "Tất cả trạng thái", color: "gray" },
    { id: "available", name: "Có sẵn", color: "green" },
    { id: "unavailable", name: "Hết hàng", color: "red" },
  ];

  const statusConfig = {
    available: { label: "Có sẵn", color: "green" },
    unavailable: { label: "Hết hàng", color: "gray" },
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddItem = () => {
    console.log("Add new item");
  };

  const handleEditItem = (item: MenuItem) => {
    console.log("Edit item:", item);
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa món ăn này?")) {
      setMenuItems(menuItems.filter((item) => item.id !== itemId));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  return (
    <div className="admin-menu-management">
      <div className="admin-content-card">
        <div className="menu-header">
          <h1>
            <i className="fas fa-utensils"></i> Quản Lý Thực Đơn
          </h1>
          <button className="btn-add-new" onClick={handleAddItem}>
            <i className="fas fa-plus"></i> Thêm Món Mới
          </button>
        </div>

        {/* Search and Filter */}
        <div className="menu-controls">
          <div className="search-and-status">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tìm kiếm món ăn, món ăn hớ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="status-filters">
              <div className="dropdown-container" ref={dropdownRef}>
                <button
                  className="dropdown-btn"
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                >
                  <span className="dropdown-text">
                    {statusFilters.find((s) => s.id === selectedStatus)?.name ||
                      "Tất cả trạng thái"}
                  </span>
                  <i
                    className={`fas fa-chevron-${
                      isStatusDropdownOpen ? "up" : "down"
                    }`}
                  ></i>
                </button>

                {isStatusDropdownOpen && (
                  <div className="dropdown-menu">
                    {statusFilters.map((status) => (
                      <button
                        key={status.id}
                        className={`dropdown-item ${
                          selectedStatus === status.id ? "active" : ""
                        }`}
                        onClick={() => {
                          setSelectedStatus(status.id);
                          setIsStatusDropdownOpen(false);
                        }}
                      >
                        <span
                          className="status-dot"
                          style={{ backgroundColor: `var(--${status.color})` }}
                        ></span>
                        {status.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  backgroundColor:
                    selectedCategory === category.id
                      ? `var(--${category.color})`
                      : "transparent",
                  borderColor: `var(--${category.color})`,
                  color:
                    selectedCategory === category.id
                      ? "white"
                      : `var(--${category.color})`,
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="menu-grid-admin">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-card-admin">
              <div className="menu-image-admin">
                <img src={item.image} alt={item.name} />
                <div className={`status-badge ${item.status}`}>
                  {statusConfig[item.status].label}
                </div>
                <div className="menu-actions">
                  <button
                    className="action-btn edit"
                    onClick={() => handleEditItem(item)}
                    title="Chỉnh sửa"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteItem(item.id)}
                    title="Xóa"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <div className="menu-info-admin">
                <h3>{item.name}</h3>
                <p className="menu-price">{formatPrice(item.price)}</p>
                <p className="menu-category">{item.category}</p>

                <div className="menu-card-actions">
                  <button className="btn-quick-edit">
                    <i className="fas fa-edit"></i> Chi tiết
                  </button>
                  <button className="btn-toggle-status">
                    <i className="fas fa-eye"></i> Chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-btn">
            <i className="fas fa-chevron-left"></i> Previous
          </button>
          <div className="page-numbers">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span>...</span>
          </div>
          <button className="pagination-btn">
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminMenuManagement;
