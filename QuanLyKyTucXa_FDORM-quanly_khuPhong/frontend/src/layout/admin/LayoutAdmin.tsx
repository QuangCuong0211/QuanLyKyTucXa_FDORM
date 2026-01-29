import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LayoutAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { to: "/admin", end: true, label: "Tổng quan" },
    { to: "/admin/khu", end: false, label: "Quản lý khu" },
    { to: "/admin/phong", end: false, label: "Quản lý phòng" },
    { to: "/admin/dang-ky-ktx", end: false, label: "Đơn đăng ký KTX" },
  ];

  return (
    <div className="d-flex min-vh-100 bg-light">
      <aside
        className={`bg-primary text-white flex-shrink-0 transition-all ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
        style={{
          width: sidebarOpen ? 240 : 72,
          minHeight: "100vh",
          boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
        }}
      >
        <div className="p-3 border-bottom border-white border-opacity-25">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/admin" className="text-white text-decoration-none fw-semibold">
              {sidebarOpen ? "Quản trị KTX" : "KTX"}
            </Link>
            <button
              type="button"
              className="btn btn-link text-white p-0"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Thu gọn" : "Mở rộng"}
            >
              {sidebarOpen ? "◀" : "▶"}
            </button>
          </div>
        </div>
        <nav className="nav flex-column p-2 flex-grow-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `nav-link text-white py-2 px-3 rounded mb-1 ${
                  isActive ? "bg-white bg-opacity-25" : ""
                }`
              }
            >
              {sidebarOpen ? item.label : item.label.charAt(0)}
            </NavLink>
          ))}
          <div className="border-top border-white border-opacity-25 mt-2 pt-2">
            <Link to="/" className="nav-link text-white py-2">
              {sidebarOpen ? "← Về trang chủ" : "←"}
            </Link>
          </div>
        </nav>
      </aside>
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <header className="bg-white shadow-sm py-2 px-3 d-flex align-items-center justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-md-none"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            Menu
          </button>
          <div className="d-flex align-items-center gap-3 ms-auto">
            <span className="text-muted small">
              {user?.fullName} <span className="badge bg-primary">{user?.role}</span>
            </span>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>
        </header>
        <main className="p-3 flex-grow-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
