import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ClientLayout() {
  const { user, logout, checked } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="ktx-header">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              KTX
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" end>
                    Trang chủ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/student/register">
                    Đăng ký ở KTX
                  </NavLink>
                </li>
                {user?.role === "admin" || user?.role === "staff" ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Quản trị
                    </Link>
                  </li>
                ) : null}
              </ul>
              <ul className="navbar-nav">
                {!checked ? (
                  <li className="nav-item">
                    <span className="nav-link">Đang tải...</span>
                  </li>
                ) : user ? (
                  <>
                    <li className="nav-item dropdown">
                      <button
                        className="btn btn-link nav-link dropdown-toggle text-white text-decoration-none d-flex align-items-center"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {user.fullName}
                        <span className="badge bg-light text-dark ms-1">{user.role}</span>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <Link className="dropdown-item" to={user.role === "student" ? "/student/register" : "/admin"}>
                            {user.role === "student" ? "Đăng ký ở KTX" : "Quản trị"}
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button className="dropdown-item text-danger" type="button" onClick={handleLogout}>
                            Đăng xuất
                          </button>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dang-nhap">
                        Đăng nhập
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-outline-light btn-sm ms-1" to="/dang-ky-tai-khoan">
                        Đăng ký
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
