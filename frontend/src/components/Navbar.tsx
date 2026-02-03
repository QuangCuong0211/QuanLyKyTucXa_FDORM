import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">QL Ký Túc Xá</span>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink to="/areas" className="nav-link">
                Quản lý khu
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/rooms" className="nav-link">
                Quản lý phòng
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/students" className="nav-link">
                Quản lý sinh viên
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
