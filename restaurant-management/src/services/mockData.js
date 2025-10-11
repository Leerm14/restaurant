export const menu = [
  {
    id: 1,
    name: "Cua rang me",
    description: "Cua tươi rang me chua ngọt, thơm ngon đặc biệt",
    price: "450.000₫",
    image: "/src/services/imgmock/menu/cuarangme.png",
    category: "Hải sản",
  },
  {
    id: 2,
    name: "Gỏi xoài hải sản",
    description: "Gỏi xoài tươi mát kết hợp hải sản tươi ngon",
    price: "180.000₫",
    image: "/src/services/imgmock/menu/goicatrich.png",
    category: "Salad",
  },
  {
    id: 3,
    name: "Lẩu cá bống mắng chưa",
    description: "Lẩu chua cay đậm đà hương vị miền Tây",
    price: "320.000₫",
    image: "/src/services/imgmock/menu/lauca.png",
    category: "Lẩu",
  },
  {
    id: 4,
    name: "Phở bò",
    description: "Phở bò truyền thống với nước dùng đậm đà",
    price: "40.000₫",
    image: "/src/assets/home/pho-bo.jpg",
    category: "Món chính",
  },
  {
    id: 5,
    name: "Bún chả",
    description: "Bún chả Hà Nội với thịt nướng thơm lừng",
    price: "35.000₫",
    image: "/src/assets/home/bun-cha.jpg",
    category: "Món chính",
  },
  {
    id: 6,
    name: "Cà phê sữa",
    description: "Cà phê sữa đá truyền thống Việt Nam",
    price: "20.000₫",
    image: "/src/assets/home/ca-phe-sua.jpg",
    category: "Đồ uống",
  },
];

// Lấy menu nổi bật (3 món đầu tiên)
export const getFeaturedMenu = () => {
  return menu.slice(0, 3);
};

// Lấy tất cả menu
export const getAllMenu = () => {
  return menu;
};

// Lấy menu theo danh mục
export const getMenuByCategory = (category) => {
  return menu.filter((item) => item.category === category);
};
