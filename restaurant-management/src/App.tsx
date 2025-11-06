import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import Home from "./pages/User/Home/Home.tsx";
import Menu from "./pages/User/Menu/Menu.tsx";
import Booking from "./pages/User/Booking/Booking.tsx";
import Sign from "./pages/Auth/Sign.tsx";
import OrderHistory from "./pages/User/OrderHistory/OrderHistory.tsx";
import AdminDashboardDemo from "./pages/Admin/AdminDashboardDemo.tsx";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/signin"
          element={
            <AuthLayout>
              <Sign />
            </AuthLayout>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboardDemo />} />

        {/* Main Routes */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/order-history" element={<OrderHistory />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
