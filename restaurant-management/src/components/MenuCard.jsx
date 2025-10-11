import React from "react";
import "./Components.css";
import Button from "./Button";

// Component MenuCard tái sử dụng cho hiển thị món ăn
const MenuCard = ({ image, title, description, price, alt, onAddToCart }) => {
  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ title, price, image });
    }
  };

  return (
    <div className="menu-item">
      <div className="menu-image">
        <img src={image} alt={alt || title} />
      </div>
      <div className="menu-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="price-action">
          <span className="price">{price}</span>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            className="add-to-cart-btn"
          >
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
