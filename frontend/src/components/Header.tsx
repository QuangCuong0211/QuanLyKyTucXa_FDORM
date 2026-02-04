import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          FDORM
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarUser"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarUser">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Trang chủ
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/student/register">
                Đăng ký KTX
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/guide">
                Hướng dẫn
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Liên hệ
              </NavLink>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-primary btn-sm">
              Đăng nhập
            </Link>
            <Link to="/register-account" className="btn btn-primary btn-sm">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
