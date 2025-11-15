import React, { useState, useEffect, useRef } from "react";
import "./AdminMenuManagement.css";
import apiClient from "../../services/api";
interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  status: "available" | "unavailable";
  image: string;
  description?: string;
}
interface NewMenuItem {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  status: "Available" | "Unavailable";
  file?: File;
}
interface Category {
  id: string;
  name: string;
  color: string;
}

const AdminMenuManagement: React.FC = () => {
  const [pagemenu, setPagemenu] = useState(1);
  const [pagecate, setPagecate] = useState(1);
  const [statusFilterValue, setStatusFilterValue] = useState<boolean | null>(
    null
  );
  const [pageCount, setPageCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "green",
  });
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "Mon chinh",
    status: "available" as "available" | "unavailable",
    description: "",
    image: "",
    file: null as File | null,
  });
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

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  // gọi api
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await apiClient.get("/api/menu", {
          params: {
            available: statusFilterValue,
            page: pagemenu,
            size: 10,
          },
        });
        const items: MenuItem[] = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category.name,
          status: item.status,
          image:
            item.imageUrl ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          description: item.description,
        }));
        console.log(items);
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, [pagemenu, statusFilterValue]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/categories", {
          params: {
            page: pagecate,
            size: 10,
          },
        });
        const randomColor =
          "#" +
          Math.floor(Math.random() * 0x1000000)
            .toString(16)
            .padStart(6, "0");
        const cats: Category[] = response.data.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          color: randomColor,
        }));
        console.log(response.data);
        console.log(cats);
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [pagecate]);
  useEffect(() => {
    const fetchpage = async () => {
      try {
        const response = await apiClient.get("/api/menu/page-count", {
          params: {
            available: statusFilterValue,
            size: 10,
          },
        });
        console.log(response.data);
        setPageCount(response.data);
      } catch (error) {
        console.error("Error fetching page count:", error);
      }
    };
    fetchpage();
  }, [statusFilterValue]);

  const statusFilters = [
    { id: "all", name: "Tất cả trạng thái", color: "gray", value: null },
    { id: "available", name: "Có sẵn", color: "green", value: true },
    { id: "unavailable", name: "Hết hàng", color: "red", value: false },
  ];

  const statusConfig = {
    available: { label: "Có sẵn", color: "green" },
    unavailable: { label: "Hết hàng", color: "gray" },
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleAddItem = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setNewItem({
      name: "",
      price: "",
      category: "Mon chinh",
      status: "available",
      description: "",
      image: "",
      file: null,
    });
  };

  const handleSaveNewItem = async () => {
    if (!newItem.name || !newItem.price) {
      alert("Vui lòng nhập tên món và giá!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("price", newItem.price);
      formData.append("categoryId", newItem.category);
      formData.append(
        "status",
        newItem.status === "available" ? "Available" : "Unavailable"
      );
      if (newItem.description) {
        formData.append("description", newItem.description);
      }
      if (newItem.file) {
        formData.append("file", newItem.file);
      }

      await apiClient.post("/api/menu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Thêm món mới thành công!");
      handleCloseModal();
      // Refresh danh sách menu
      setPagemenu(1);
    } catch (error) {
      console.error("Error adding menu item:", error);
      alert("Có lỗi xảy ra khi thêm món!");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewItem((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  const handleAddCategory = () => {
    setIsAddCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsAddCategoryModalOpen(false);
    setNewCategory({
      name: "",
      color: "green",
    });
  };

  const handleSaveNewCategory = async () => {
    if (!newCategory.name.trim()) {
      alert("Vui lòng nhập tên danh mục!");
      return;
    }

    try {
      const newCategoryItem = {
        name: newCategory.name,
      };

      await apiClient.post("/api/categories", newCategoryItem);

      console.log("Added category:", newCategoryItem);
      handleCloseCategoryModal();
      setPagecate(1);
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Có lỗi xảy ra khi thêm danh mục!");
    }
  };

  const handleCategoryInputChange = (field: string, value: string) => {
    setNewCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
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
                          // Cập nhật statusFilterValue cho API call
                          if (status.id === "all") {
                            setStatusFilterValue(null);
                          } else if (status.id === "available") {
                            setStatusFilterValue(true);
                          } else if (status.id === "unavailable") {
                            setStatusFilterValue(false);
                          }
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

            {/* Add Category Button */}
            <button
              className="filter-btn add-category-btn"
              onClick={handleAddCategory}
              title="Thêm danh mục mới"
            >
              <i className="fas fa-plus"></i> Thêm danh mục
            </button>
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
                <div className="menu-main-info">
                  <div className="menu-text-info">
                    <h3>{item.name}</h3>
                    <p className="menu-price">{formatPrice(item.price)}</p>
                  </div>
                  <p className="menu-category" data-category={item.category}>
                    {item.category}
                  </p>
                </div>
                {item.description && (
                  <p className="menu-description">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-btn">
            <i className="fas fa-chevron-left"></i> Previous
          </button>
          <div className="page-numbers"></div>
          <button className="pagination-btn">
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="fas fa-plus"></i> Thêm Món Mới
              </h2>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>
                  Tên món <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên món ăn..."
                  value={newItem.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Giá (VNĐ) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="85000"
                    value={newItem.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Danh mục</label>
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                  >
                    {categories
                      .filter((cat) => cat.id !== "all")
                      .map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Trạng thái</label>
                <select
                  value={newItem.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                >
                  <option value="available">Có sẵn</option>
                  <option value="unavailable">Hết hàng</option>
                </select>
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  placeholder="Mô tả chi tiết về món ăn..."
                  value={newItem.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Hình ảnh món ăn</label>
                <div className="image-upload-area">
                  <div className="upload-hint">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span>Chọn file hình ảnh</span>
                    <input
                      type="file"
                      id="fileUpload"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ marginTop: "10px" }}
                    />
                    {newItem.file && (
                      <small
                        style={{
                          color: "green",
                          display: "block",
                          marginTop: "5px",
                        }}
                      >
                        Đã chọn: {newItem.file.name}
                      </small>
                    )}
                    <small>Định dạng: JPG, PNG. Kích thước tối đa: 5MB</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCloseModal}>
                <i className="fas fa-times"></i> Hủy
              </button>
              <button className="btn-save" onClick={handleSaveNewItem}>
                <i className="fas fa-save"></i> Thêm món
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isAddCategoryModalOpen && (
        <div className="modal-overlay" onClick={handleCloseCategoryModal}>
          <div
            className="modal-content category-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>
                <i className="fas fa-tags"></i> Thêm Danh Mục Mới
              </h2>
              <button
                className="modal-close-btn"
                onClick={handleCloseCategoryModal}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>
                  Tên danh mục <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Món khai vị, Món nướng..."
                  value={newCategory.name}
                  onChange={(e) =>
                    handleCategoryInputChange("name", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Màu sắc</label>
                <div className="color-picker">
                  {["green", "blue", "purple", "red", "orange", "pink"].map(
                    (color) => (
                      <button
                        key={color}
                        className={`color-option ${
                          newCategory.color === color ? "selected" : ""
                        }`}
                        style={{ backgroundColor: `var(--${color})` }}
                        onClick={() =>
                          handleCategoryInputChange("color", color)
                        }
                        title={color}
                      >
                        {newCategory.color === color && (
                          <i className="fas fa-check"></i>
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="category-preview">
                <label>Xem trước:</label>
                <button
                  className="filter-btn preview-btn"
                  style={{
                    backgroundColor: `var(--${newCategory.color})`,
                    borderColor: `var(--${newCategory.color})`,
                    color: "white",
                  }}
                >
                  {newCategory.name || "Tên danh mục"}
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCloseCategoryModal}>
                <i className="fas fa-times"></i> Hủy
              </button>
              <button className="btn-save" onClick={handleSaveNewCategory}>
                <i className="fas fa-save"></i> Thêm danh mục
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenuManagement;
