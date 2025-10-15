import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminPage from "./pages/AdminPage";
import StaffPage from "./pages/StaffPage";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Booking from "./pages/Booking/Booking";
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
