import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import StaffPage from "./pages/StaffPage.tsx";
import Home from "./pages/Home/Home.tsx";
import Menu from "./pages/Menu/Menu.tsx";
import Booking from "./pages/Booking/Booking.tsx";
import SignIn from "./pages/Auth/SignIn.tsx";
import OrderHistory from "./pages/OrderHistory/OrderHistory.tsx";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/signin"
          element={
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          }
        />

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
