import { menu } from "../services/mockData";
import Button from "../components/Button";

export default function CustomerPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="mb-4">
        {menu.map((item) => (
          <li key={item.id} className="flex justify-between border-b py-2">
            <span>{item.name}</span>
            <span>{item.price}đ</span>
          </li>
        ))}
      </ul>
      <Button onClick={() => alert("Đặt món thành công!")}>Đặt món</Button>
    </div>
  );
}
