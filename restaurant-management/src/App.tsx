import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import StaffPage from "./pages/StaffPage.tsx";
import Home from "./pages/Home/Home.tsx";
import Menu from "./pages/Menu/Menu.tsx";
import Booking from "./pages/Booking/Booking.tsx";

function App(): React.ReactElement {
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
