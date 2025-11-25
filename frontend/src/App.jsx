// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StyledMenu from "./pages/StyledMenu";
import Cart from "./pages/Cart";
import AdminLogin from "./pages/AdminLogin";
import AdminMenu from "./pages/adminMenu"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Pages */}
        <Route path="/" element={<StyledMenu />} />
        <Route path="/cart" element={<Cart />} />

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/menu" element={<AdminMenu />} />

      </Routes>
    </BrowserRouter>
  );
}
