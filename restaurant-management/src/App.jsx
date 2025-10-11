import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminPage from "./pages/AdminPage";
import StaffPage from "./pages/StaffPage";
import Home from "./pages/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
