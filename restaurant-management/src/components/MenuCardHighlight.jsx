import React from "react";
import "./Components.css";
import Button from "./Button";

// Component MenuCardHighlight nổi bật cho hiển thị món ăn đặc biệt
const MenuCardHighlight = ({
  image,
  title,
  description,
  price,
  alt,
  onAddToCart,
}) => {
  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ title, price, image });
    }
  };

  return (
    <div className="menu-item-highlight">
      <div className="menu-image-highlight">
        <img src={image} alt={alt || title} />
      </div>
      <div className="menu-info-highlight">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="price-action-highlight">
          <span className="price-highlight">{price}</span>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            className="add-to-cart-btn-highlight"
          >
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuCardHighlight;
